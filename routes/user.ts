import express from 'express'
import { getUser } from '../controllers/user'

export const userRouter = express.Router()

userRouter.get("/", getUser)