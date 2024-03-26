import { google } from "@/lib/oauth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

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

  const { accessToken, idToken } = await google.validateAuthorizationCode(
    code,
    codeVerifier
  );

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
};
