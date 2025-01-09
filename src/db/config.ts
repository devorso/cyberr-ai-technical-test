import 'dotenv/config';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import { tasksTable } from './schema';
import { getTaskList } from '../models/task';
let db: LibSQLDatabase
export const getDatabaseConnection =  () => {
    if (!db) {
        db = drizzle(process.env.DB_FILE_NAME!)
    }

    return db
}