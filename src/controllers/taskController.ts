import { eq } from "drizzle-orm";
import { getDatabaseConnection } from "../db/config";
import { tasksTable } from "../db/schema"
import { createNewTask, deleteTask, getTaskList, Task, updateTask } from "../models/task";
import { Request, Response } from "express";


export default {

    createTaskHandler: async (req: Request, res: Response) => {
        // new task
        try {
            let result = await createNewTask({
                title: req.body.title,
                description: req.body.description,
                id: 0,
                status: "pending"
            })
            if (result) {
                return res.status(201).json({ status: "OK" })
            }
        } catch (err) {

        }
        return res.status(503).json({ status: "NOK" })
    },
    deleteTaskHandler: async (req: Request, res: Response) => {
        try {

            await deleteTask(+req.params.id)
            return res.status(201).json({ message: "OK" })
        }
        catch (err) {
            return res.status(503).json({ message: "An error has been occured" })
        }
    },

    updateTaskHandler: async (req: Request, res: Response) => {
        //change status
        const task: Task = {
            description: req.body.description || "No description found",
            title: req.body.title || "No title found",
            id: parseInt(req.params.id),
            status: req.body.status || "pending"
        }
        if (req.body.status !== "pending" && req.body.status !== "completed") {
            return res.status(500).json({ message: "Invalid data!" })
        }
        try {
            await updateTask({
                description: task.description,
                id: task.id,
                status: task.status,
                title: task.title
            })
            return res.status(201).json({ message: "OK" })
        } catch (err) {
            return res.status(503).json({ message: "An error has been occured" })
        }
    },

    getTaskListHandler: async (req: Request, res: Response) => {
        return res.status(200).json(await getTaskList())
    }

}