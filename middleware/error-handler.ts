
import {Request, Response} from 'express'
import { CustomAPIError } from '../errors/custom-error'
 export const errorHandlerMiddleware = (err:any, req:Request, res:Response, next:any) => {

    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).send(err.message)
    }

    return res.status(500).send(err.message)
}

