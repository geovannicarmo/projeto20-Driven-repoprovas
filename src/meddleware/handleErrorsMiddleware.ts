import { Request, Response, NextFunction } from "express";
import { errorTypeToStatusCode } from "../utils/errorUtils";

export function errorHandlingMiddleware (
    err: TError | any,
    req:Request, 
    res: Response, 
    next: NextFunction
    ) {
    
        console.log(err)

        if(err.type){
           const statusCode = errorTypeToStatusCode(err.type)
           return res.status(statusCode).send(err.message);
        }

}



export type TError = {
    type:string,
    message:string
} 
