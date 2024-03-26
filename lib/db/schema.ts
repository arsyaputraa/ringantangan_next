import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", ["user", "admin"]);

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password"),
  isEmailVerified: boolean("is_email_verified").notNull().default(true),
  googleId: text("googleId").unique(),
  role: roleEnums("role").notNull().default("user"),
});

// export const oauthAccountTable = pgTable("oauth_account", {
//   id: text("id").primaryKey(),
//   userId: text("user_id")
//     .notNull()
//     .references(() => userTable.id),
//     provider:
// });

export const emailVerificationTable = pgTable("email_verification", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  code: text("code").notNull(),
  sentAt: timestamp("sent_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
