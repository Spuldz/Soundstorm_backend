import {Request, Response, NextFunction} from 'express'
import { BadRequest } from '../errors/bad-request'
import jwt from 'jsonwebtoken'
import { ServerError } from '../errors/server-error'
import { Unauthenticated } from '../errors/unauthenticated'

export const authMiddleware = async (req:Request | any, res:Response, next:NextFunction) => {
    const authHeader = req.headers['authorization']
    if(!authHeader || !authHeader.startsWith("Bearer")){throw new BadRequest("invalid auth header")}

    const token = authHeader.split(" ")[1]
    if(!token){throw new BadRequest("invalid token")}

    try {
       const jwtKey = process.env.JWT_KEY
       if(!jwtKey){throw new ServerError("encryption key not found")}

       const payload:any = jwt.verify(token, jwtKey)

       req.user = {id: payload.id, username: payload.username, roles: payload.roles}
       next()
    } catch (error) {
        throw new Unauthenticated("invalid token")
    }
    

}