import { Request, Response, NextFunction } from "express";



export default function schemaMiddleware(schema: any){
    return (
    req: Request,
    res: Response, 
    next: NextFunction
    )=> {
        const {error} = schema.validate(req.body, { abortEarly: false})
        if(error){
            const validateError: any = []
            
            error.details.map((error: any)=>{validateError.push(error.message)})

           return res.status(422).send(validateError)
        }

        next()
        
    }
}