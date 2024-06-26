import { boolean, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", ["user", "admin", "superadmin"]);

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password"),
  isEmailVerified: boolean("is_email_verified").notNull().default(true),
  fullName: text("full_name"),
  googleId: text("google_id").unique(),
  role: roleEnums("role").notNull().default("user"),
  avatar: text("avatar"),
});
