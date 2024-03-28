import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { and, eq } from "drizzle-orm";
import db from "@/lib/db";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { emailVerificationTable } from "@/lib/db/schema/authSchema";
import { redirect } from "next/dist/server/api-utils";
import { userTable } from "@/lib/db/schema";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const token = searchParams.get("token");

  if (!token) {
    return Response.json({ error: "token not found" }, { status: 400 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      code: string;
      userId: string;
    };

    const emailVerificationQueryResult =
      await db.query.emailVerificationTable.findFirst({
        where: and(
          eq(emailVerificationTable.userId, decoded.userId),
          eq(emailVerificationTable.code, decoded.code)
        ),
      });

    if (!emailVerificationQueryResult) {
      return Response.json({ error: "invalid token" }, { status: 400 });
    }

    await db
      .delete(emailVerificationTable)
      .where(eq(emailVerificationTable.userId, decoded.userId));

    await db
      .update(userTable)
      .set({ isEmailVerified: true })
      .where(eq(userTable.email, decoded.email));

    const session = await lucia.createSession(decoded.userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return Response.redirect(new URL(process.env.NEXT_PUBLIC_BASE_URL!), 302);
  } catch (error: any) {
    return Response.json(
      {
        error: error?.message,
      },
      {
        status: 400,
      }
    );
  }
};
