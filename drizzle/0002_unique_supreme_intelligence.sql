PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tasks_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`status` text,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tasks_table`("id", "title", "description", "status", "timestamp") SELECT "id", "title", "description", "status", "timestamp" FROM `tasks_table`;--> statement-breakpoint
DROP TABLE `tasks_table`;--> statement-breakpoint
ALTER TABLE `__new_tasks_table` RENAME TO `tasks_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;