import { CustomAPIError } from "./custom-error";

export class Unauthenticated extends CustomAPIError{
    statusCode:number
    constructor(message:string){
        super(message)
        this.statusCode = 401
    }
}