import express, { Request, Response, Router } from "express";
import taskController from "../controllers/taskController"
import { Task } from "../models/task";

const router: Router = express.Router();


//crud operations API REST using Drizzle ORM with SQLite.


router.post("/create", taskController.createTaskHandler)
router.delete("/:id", taskController.deleteTaskHandler)

router.patch("/:id", taskController.updateTaskHandler)



router.get("/", taskController.getTaskListHandler)



export default router


