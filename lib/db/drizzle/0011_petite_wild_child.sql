ALTER TABLE "post" RENAME COLUMN "picture" TO "img_url";--> statement-breakpoint
ALTER TABLE "post" DROP CONSTRAINT "post_created_by_user_id_fk";
--> statement-breakpoint
ALTER TABLE "post" DROP CONSTRAINT "post_updated_by_user_id_fk";
--> statement-breakpoint
ALTER TABLE "like" ALTER COLUMN "created_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "created_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "last_updated" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "subtitle" text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "img_public_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post" ADD CONSTRAINT "post_created_by_user_email_fk" FOREIGN KEY ("created_by") REFERENCES "user"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post" ADD CONSTRAINT "post_updated_by_user_email_fk" FOREIGN KEY ("updated_by") REFERENCES "user"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
