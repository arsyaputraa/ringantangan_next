import { lucia } from "@/lib/auth";
import db from "@/lib/db";
import { oauthAccountTable, roleEnums, userTable } from "@/lib/db/schema";
import { google } from "@/lib/oauth";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { RedirectType } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.nextUrl);

    const searchParams = url.searchParams;

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      return Response.json(
        {
          error: "invalid request",
        },
        {
          status: 400,
        }
      );
    }

    const codeVerifier = cookies().get("codeVerifier")?.value;
    const savedState = cookies().get("state")?.value;

    if (!codeVerifier || !savedState) {
      return Response.json(
        {
          error: "invalid request",
        },
        {
          status: 400,
        }
      );
    }

    if (savedState !== state) {
      return Response.json(
        {
          error: "state do not match",
        },
        {
          status: 400,
        }
      );
    }

    const { accessToken, accessTokenExpiresAt, refreshToken } =
      await google.validateAuthorizationCode(code, codeVerifier);

    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      }
    );

    const googleData = (await googleRes.json()) as GoogleUser;

    let user = null;
    await db.transaction(async (trx) => {
      user = await trx.query.userTable.findFirst({
        where: eq(userTable.email, googleData.email),
      });

      if (!user) {
        const userId = generateId(15);
        const newUser = await trx
          .insert(userTable)
          .values({
            id: userId,
            full_name: googleData.given_name,
            email: googleData.email,
            avatar: googleData.picture,
          })
          .returning({ id: userTable.id, role: userTable.role });

        if (newUser.length === 0 || !newUser[0] || !newUser) {
          trx.rollback();
          return Response.json(
            {
              error: "failed to create user ",
            },
            {
              status: 500,
            }
          );
        }

        user = newUser[0];

        const createdOauthAccountRes = await trx
          .insert(oauthAccountTable)
          .values({
            accessToken,
            expiresAt: accessTokenExpiresAt,
            id: googleData.id,
            provider: "google",
            providerUserId: googleData.id,
            userId: userId,
            refreshToken,
          });

        if (createdOauthAccountRes.rowCount === 0) {
          trx.rollback();
          return Response.json(
            {
              error: "failed to create user ",
            },
            {
              status: 500,
            }
          );
        }
      } else {
        const updateOauthAccountRes = await trx
          .update(oauthAccountTable)
          .set({ expiresAt: accessTokenExpiresAt, accessToken, refreshToken })
          .where(eq(oauthAccountTable.id, googleData.id));

        if (updateOauthAccountRes.rowCount === 0) {
          trx.rollback();
          return Response.json(
            {
              error: "failed to update oauth session",
            },
            {
              status: 500,
            }
          );
        }
      }
    });

    const session = await lucia.createSession(user!.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    cookies().set("state", "", {
      expires: new Date(0),
    });

    cookies().set("codeVerifier", "", {
      expires: new Date(0),
    });

    return NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
      { status: 302 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};
