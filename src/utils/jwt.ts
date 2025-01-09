import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import type { NextFunction, Request, Response } from "express";
dotenv.config()
export const generateAccessToken = (username: string) => {
    return jwt.sign({username}, process.env.TOKEN_SECRET || "TEST", { expiresIn: "7d" });
}


export const  authenticateToken = (req: Request, res: Response | null, next: NextFunction | null) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null)  {
        if (res) {
        return res.status(401).json({message:"Unauthorized"})
        }
        return {message:"Unauthorized"}
    }
  
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)
  
      if (err) {
        if (res) {
            return res.status(403).json({message:"Unauthorized"})
        }
        return {message:"Unauthorized"}
    }
  
      req.user = user
  
      if (next) {
      next()
      }
    })
  }