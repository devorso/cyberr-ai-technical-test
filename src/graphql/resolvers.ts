
import { Task } from "../models/task";
import { createNewTask, getTaskById, getTaskList, updateTask } from "../controllers/taskController";


export default {
    async task({id}) {
        console.log("task number ", parseInt(id))
        let tasks = await getTaskList()

      return tasks.filter((t) => t.id.toString() === id)[0];
    },
    tasks() {
        return getTaskList()
    },
    async addTask({title, description, status}: {title: string; description: string; status: "pending"| "completed"}) {
        return await createNewTask({
            id:0,
            title,
            description,
            status
        })
    },
    async updateTask({id,title,description, status}:  {id:number; title: string; description: string; status: "pending"| "completed"}) {
        return await updateTask({
            title,
            description,
            status,
            id
        })
    }
  }