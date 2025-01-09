import express, { Router } from "express";
import authController from "../controllers/authController"

const router: Router = express.Router();





router.post("/login", authController.loginUserHandler)
router.post("/register", authController.registerUserHandler)




export default router

