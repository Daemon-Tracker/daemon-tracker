ALTER TABLE "daemon-tracker_spartans" ALTER COLUMN "spartansRole" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "daemon-tracker_sudo" ALTER COLUMN "sudoStatus" SET DEFAULT 'Unknown';--> statement-breakpoint
ALTER TABLE "daemon-tracker_sudo" ALTER COLUMN "sudoStatus" SET NOT NULL;