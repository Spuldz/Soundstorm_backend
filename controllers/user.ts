import { Request, Response } from "express";


export const getUser = (req:any, res:Response) => {
    const user = req.user
    res.json({ user })
}