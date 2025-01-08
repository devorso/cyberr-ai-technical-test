import { getDatabaseConnection } from "../db/config";
import {tasksTable} from "../db/schema"

export interface Task {
    id: number;
    title: string;
    description: string;
    status: "pending" | "completed";
}


