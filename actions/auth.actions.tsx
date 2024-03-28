"use server";

import { lucia, validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { emailVerificationTable } from "@/lib/db/schema/authSchema";
import { google } from "@/lib/oauth";
import { signInSchema, signUpSchema } from "@/lib/validationSchema/authSchema";
import { generateCodeVerifier, generateState } from "arctic";
import * as argon2 from "argon2";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  console.log(values);

  const hashedPassword = await argon2.hash(values.password);
  const userId = generateId(15);
  try {
    const userExist = await db.query.userTable.findFirst({
      where: eq(userTable.email, values.email),
    });

    if (userExist) {
      return {
        error: "Email already used by another account",
      };
    }

    await db.insert(userTable).values({
      id: userId,
      email: values.email,
      hashedPassword: hashedPassword,
      fullName: values.fullName,
    });

    const code = Math.random().toString(36).substring(2, 8);

    await db.insert(emailVerificationTable).values({
      code,
      userId,
      id: generateId(15),
      sentAt: new Date(),
    });

    const token = jwt.sign(
      { email: values.email, userId, code },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5m",
      }
    );

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${token}`;
    console.log(url);

    return {
      success: true,
      data: userId,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const signIn = async (values: z.infer<typeof signInSchema>) => {
  const existingUser = await db.query.userTable.findFirst({
    where: (table) => eq(table.email, values.email),
  });

  if (!existingUser) {
    return {
      error: "Incorrect username or password",
      key: "invalid_credentials",
    };
  }

  if (!existingUser.hashedPassword) {
    return {
      error: "Incorrect username or password",
      key: "invalid_credentials",
    };
  }

  const isValidPassword = await argon2.verify(
    existingUser.hashedPassword,
    values.password
  );

  if (!isValidPassword) {
    return {
      error: "Incorrect username or password",
      key: "invalid_credentials",
    };
  }

  if (!existingUser.isEmailVerified) {
    return {
      error: "Please verify your email first",
      key: "email_not_verified",
    };
  }

  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    success: "Logged in successfully",
  };
};

export const signOut = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    revalidatePath("/");
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const resendEmailVerification = async (email: string) => {
  try {
    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });

    if (!existingUser) {
      return { error: "user not found" };
    }

    if (existingUser.isEmailVerified) {
      return { error: "email already verified" };
    }

    const existedCode = await db.query.emailVerificationTable.findFirst({
      where: eq(emailVerificationTable.userId, existingUser.id),
    });

    if (!existedCode) {
      return {
        error: "verification code not found",
      };
    }

    const sentAt = new Date(existedCode.sentAt);
    const isOneMinuteHasPassed =
      new Date().getTime() - sentAt.getTime() > 60000;

    if (!isOneMinuteHasPassed) {
      return {
        error: `email already sent, resend in ${
          60 - Math.floor((new Date().getTime() - sentAt.getTime()) / 1000)
        } seconds`,
      };
    }

    const code = Math.random().toString(36).substring(2, 8);

    await db
      .update(emailVerificationTable)
      .set({
        code,
        sentAt: new Date(),
      })
      .where(eq(emailVerificationTable.userId, existingUser.id));

    const token = jwt.sign(
      { email: email, userId: existingUser.id, code },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5m",
      }
    );

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${token}`;
    console.log(url);

    return {
      success: "email sent",
      data: existingUser.id,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const createGoogleAuthorizationURL = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authorizationURL = await google.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["email", "profile"],
      }
    );

    return {
      success: true,
      data: authorizationURL,
    };
  } catch (error: any) {
    return { error: error?.message };
  }
};
