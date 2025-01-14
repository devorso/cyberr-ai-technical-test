import { eq } from "drizzle-orm";
import { getDatabaseConnection } from "../db/config";
import { tasksTable } from "../db/schema";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: "pending" | "completed";
}
const db = getDatabaseConnection()


export async function createNewTask(task: Task) {

    const { title, description, status } = task;
    
    let data = await db.insert(tasksTable).values({
        title,
        description,
        status:"pending",
    }).returning()


    return data ? data[0] : {}
}


export async function updateTask(task: Task) {

    let { title, description, status, id } = task
    if (status !== "pending" && status !== "completed") {
        throw new Error("Invalid data")
    }
    try {
        let data = await db.update(tasksTable).set({
            title,
            description,
            status
        }).where(eq(tasksTable.id, id)).returning()
        return data[0]
    } catch (err) {
        return {}
    }
}

export async function getTaskList() {
    let data = await db.select().from(tasksTable);

    return data

}

export async function getTaskById(id: number) {
    return await db.select().from(tasksTable).where(eq(tasksTable.id, +id))[0]
}
export async function deleteTask(id: number) {

    try {
    let data = await db.delete(tasksTable).where(eq(tasksTable.id, id)).returning()
    return data[0]
    }catch(err){
        return {}
    }
}