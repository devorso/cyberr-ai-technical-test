import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable("tasks_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
  status:text({ enum: ["pending", "completed"] }),//pendign or completed
  timestamp: text('timestamp')
  .notNull()
  .default(sql`(current_timestamp)`),

});