import express, {Request, Response} from "express";
import {createNewTask, deleteTask, getTaskList, updateTask} from "../controllers/taskController"
import { Task } from "../models/task";
const router = express.Router();


//crud operations API REST using Drizzle ORM with SQLite.


router.post("/create", async (req: Request, res: Response) => {
    // new task
    let result = await createNewTask({
        title: req.body.title,
        description: req.body.description,
        id:0,
        status: "pending"
    })
    if (result) {
        return res.status(201).json({status:"OK"})
    }
    return res.status(503).json({status:"NOK"})
})
router.delete("/:id", async (req, res) => {
    // delete task
    try {

        await deleteTask(+req.params.id)
        return res.status(201).json({message:"OK"})
    }
    catch(err){
        return res.status(503).json({message:"An error has been occured"})
    }
})

router.patch("/:id", async (req, res) => {
    //change status
    const task: Task = {
        description: req.body.description || "No description found",
        title: req.body.title || "No title found",
        id: req.body.id,
        status: req.body.status || "pending"
    }
    if (req.body.status !== "pending" || req.body.status !== "completed") {
        return res.status(500).json({message:"Invalid data!"})
    }
    try {
    await updateTask({
        description: task.description,
        id: task.id,
        status: task.status,
        title: task.title
    })
    return res.status(201).json({message:"OK"})
}catch(err){
    return res.status(503).json({message:"An error has been occured"})
}
})



router.get("/", async (req, res) => {
    // list tasks
    return res.status(200).json(await getTaskList())
} )



export default router


