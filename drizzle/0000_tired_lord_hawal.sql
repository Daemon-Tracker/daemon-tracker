CREATE TABLE IF NOT EXISTS "daemon-tracker_admin" (
	"adminId" uuid PRIMARY KEY NOT NULL,
	"spartansEmail" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "daemon-tracker_spartans" (
	"spartansId" uuid PRIMARY KEY NOT NULL,
	"spartansEmail" varchar(255) NOT NULL,
	"spartansRole" varchar NOT NULL,
	CONSTRAINT "daemon-tracker_spartans_spartansEmail_unique" UNIQUE("spartansEmail")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "daemon-tracker_sudo" (
	"sudoId" uuid PRIMARY KEY NOT NULL,
	"sudoNim" integer NOT NULL,
	"sudoName" varchar(255) NOT NULL,
	"sudoMajor" varchar,
	"sudoStatus" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "daemon-tracker_admin" ADD CONSTRAINT "daemon-tracker_admin_spartansEmail_daemon-tracker_spartans_spartansEmail_fk" FOREIGN KEY ("spartansEmail") REFERENCES "public"."daemon-tracker_spartans"("spartansEmail") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spartans_email_idx" ON "daemon-tracker_spartans" USING btree ("spartansEmail");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sudo_nim_idx" ON "daemon-tracker_sudo" USING btree ("sudoNim");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sudo_name_idx" ON "daemon-tracker_sudo" USING btree ("sudoName");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sudo_status_idx" ON "daemon-tracker_sudo" USING btree ("sudoStatus");