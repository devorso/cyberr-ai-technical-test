import { loginUserDatabase, registerUserDatabase } from "../models/user"
import type { Request, Response } from "express"


export default {
    loginUserHandler: async (req: Request, res: Response) => {

        try {
            return res.status(201).json({accessToken:await loginUserDatabase(req.body.username, req.body.password)})
            
        }catch(err){
            console.log(err)
            return res.status(403).json({message: "NOK"})
        }
    },
    registerUserHandler: async(req: Request, res: Response) => {
        try {
            await registerUserDatabase(req.body.username, req.body.password)
            return res.status(200).json({message: "OK"})
        }catch(err){
            console.log(err)
            return res.status(403).json({message: "NOK"})
        }
    }
}