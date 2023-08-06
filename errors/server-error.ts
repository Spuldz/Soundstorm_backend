import { CustomAPIError } from "./custom-error"

export class ServerError extends CustomAPIError{
    statusCode:number
    constructor(message:string){
        super(message)
        this.statusCode = 500
    }
}