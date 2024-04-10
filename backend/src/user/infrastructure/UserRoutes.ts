import express from "express";
import { createUserController, getUserByIdController, logInUserController } from "./UserDependencies";

export const userRouter = express.Router()

userRouter.post('/',createUserController.run.bind(createUserController))
userRouter.get('/user/:id',getUserByIdController.run.bind(getUserByIdController))
userRouter.post('/login',logInUserController.run.bind(logInUserController))