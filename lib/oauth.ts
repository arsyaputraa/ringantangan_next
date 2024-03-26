import { Google, generateState } from "arctic";

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_ID!,
  process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/oauth/google/callback"
);

const state = generateState();
