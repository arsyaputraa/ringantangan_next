import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { userTable } from "./userSchema";

export const postTable = pgTable("post", {
  id: text("id").primaryKey(),
  createdBy: text("created_by")
    .notNull()
    .references(() => userTable.id),
  updatedBy: text("updated_by")
    .notNull()
    .references(() => userTable.id),
  title: text("title").notNull(),
  content: text("content"),
  picture: text("picture"),
  createdDate: timestamp("created_date").default(sql`CURRENT_TIMESTAMP`),
  lastUpdatedDate: timestamp("last_updated").default(sql`CURRENT_TIMESTAMP`),
  is_public: boolean("is_public").default(true),
  likeCount: integer("like_count").default(0),
});

export const likeTable = pgTable("like", {
  id: text("id").primaryKey(),
  postId: text("post_id")
    .notNull()
    .references(() => postTable.id),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  createdDate: timestamp("created_date").default(sql`CURRENT_TIMESTAMP`),
});