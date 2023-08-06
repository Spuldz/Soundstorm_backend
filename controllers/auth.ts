import { Request, Response } from "express"
import { Model } from "mongoose"
import { BadRequest } from "../errors/bad-request"
import { NotFound } from "../errors/not-found"
import jwt from 'jsonwebtoken'
import { Unauthenticated } from "../errors/unauthenticated"




const User:Model<any> = require("../models/User")

export const register = async (req:Request, res:Response) => {

    const user = await User.create({...req.body})
    const refreshToken = await user.createRefreshToken()
    const accessToken = await user.createAccessToken()

    res.json({
        user: {
            username: user.username,
            roles: user.roles
        },
        refreshToken,
        accessToken
    })
}

export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body

    if(!email || !password){throw new BadRequest("invalid credentials")}

    const user = await User.findOne({email: email})
    if(!user){throw new NotFound("invalid email")}
    
    const passwordMatches = await user.comparePasswords(password)
    if(!passwordMatches){throw new NotFound("invalid password")}

    const refreshToken = await user.createRefreshToken()
    const accessToken = await user.createAccessToken()

    res.json({
        user: {
            username: user.username,
            roles: user.roles
        },
        refreshToken,
        accessToken
    })
}

export const getAccessToken = async (req:Request, res:Response) => {
    const authHeader = req.headers['authorization']
    if(!authHeader){throw new BadRequest("invalid auth header")}

    const refreshToken = authHeader.split(" ")[1]
    if(!refreshToken){throw new BadRequest("invalid token")}

    try {
        const jwtKey:any = process.env.JWT_KEY
        const payload:any = await jwt.verify(refreshToken, jwtKey)
        
        const user = await User.findOne({_id: payload.id})
        const accessToken = await user.createAccessToken()

        res.json({ accessToken })

        return

    } catch (error) {
        throw new Unauthenticated("invalid token")
    }


}
