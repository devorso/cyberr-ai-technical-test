
import { createNewTask, deleteTask, getTaskList, type Task, updateTask } from "../models/task";
import { loginUser, loginUserDatabase, registerUser, registerUserDatabase } from "../models/user";


export default {
  Query:{  async task(parent, {id}) {
  
        let tasks = await getTaskList()

      return tasks.filter((t) => t.id.toString() === id)[0];
    },
    tasks() {
       
        return getTaskList()
    }},
    Mutation: {
     
    async addTask(parent,{title, description, status}: {title: string; description: string; status: "pending"| "completed"}, context) {
      
        if (!context.user) {
            throw new Error("Unauthorized")
        }

        return await createNewTask({
            id:0,
            title,
            description,
            status
        })
    },
    async updateTask(parent,{id,title,description, status}:  {id:number; title: string; description: string; status: "pending"| "completed"}, context) {
      
        if (!context.user) {
            throw new Error("Unauthorized")
        }
        return await updateTask({
            title,
            description,
            status,
            id
        })
    },
    async deleteTask(parent,{id}: {id: number}, context) {
    
        if (!context.user) {
            throw new Error("Unauthorized")
        }
        return await deleteTask(id)
    },
    async loginUser(parent, {username, password}: {username: string; password:string;}) {
        return await loginUserDatabase(username, password)
    },
    async registerUser(parent, {username, password}: {username: string; password:string;}) {
        return await registerUserDatabase(username, password)
    },
}
  }