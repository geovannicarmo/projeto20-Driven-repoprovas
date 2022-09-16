import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { internalServerError } from "../utils/errorUtils";
import {getUserByIdServices} from '../Services/authServices'

export default async function verifyTokenMiddlewerw(
    req: Request,
    res: Response, 
    next: NextFunction
    ){
       const authorization = req.headers.authorization

       console.log(authorization)

       if(!authorization){
        return res.status(401).send("token not send")
       }
       const SECRET = process.env.SECRET
       if(!SECRET){
        throw internalServerError("Internal Server Error")
       }

       try{

           const token = authorization.replace("Bearer ","")
           const dataToken: any = jwt.verify(token, SECRET)
           const idUser = dataToken.data

           await getUserByIdServices(idUser)
           res.locals.idUser = idUser
           next()
        }catch{
            return res.status(401).send("invalid token")
        }
    }