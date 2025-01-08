CREATE TABLE `tasks_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`status` text,
	`timestamp` timestamp DEFAULT (now()) NOT NULL
);
