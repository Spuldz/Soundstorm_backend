import express from 'express'
import { authMiddleware } from '../middleware/auth'
import { getAccessToken, login, register } from '../controllers/auth'

export const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/getAccessToken", getAccessToken)

