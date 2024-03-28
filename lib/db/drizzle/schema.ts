import {
  pgTable,
  foreignKey,
  pgEnum,
  text,
  timestamp,
  unique,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const role = pgEnum("role", ["superadmin", "admin", "user"]);

export const emailVerification = pgTable("email_verification", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  code: text("code").notNull(),
  sentAt: timestamp("sent_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const oauthAccount = pgTable("oauth_account", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  provider: text("provider").notNull(),
  providerUserId: text("provider_user_id").notNull(),
  accessToken: text("access_token").notNull(),
  refeshToken: text("refesh_token"),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey().notNull(),
    email: text("email").notNull(),
    hashedPassword: text("hashed_password"),
    isEmailVerified: boolean("is_email_verified").default(true).notNull(),
    fullName: text("full_name"),
    googleId: text("google_id"),
    role: role("role").default("user").notNull(),
    avatar: text("avatar"),
  },
  (table) => {
    return {
      userEmailUnique: unique("user_email_unique").on(table.email),
      userGoogleIdUnique: unique("user_googleId_unique").on(table.googleId),
    };
  }
);
