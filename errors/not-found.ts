
import { CustomAPIError } from "./custom-error";


export class NotFound extends CustomAPIError{
    statusCode:number
    constructor(message:string){
        super(message)
        this.statusCode = 404
    }
}


