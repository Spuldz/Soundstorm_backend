
import {Request, Response} from 'express'

 export const NotFoundMiddleware = (req:Request, res:Response) => {
    return res.status(404).send("not found")
}
