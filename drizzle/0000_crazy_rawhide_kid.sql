CREATE TABLE `responses` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`attendance` text NOT NULL,
	`guests` integer NOT NULL,
	`dietary` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `responses_email_unique` ON `responses` (`email`);