import { Request, Response } from "express";
import * as authServices from '../Services/authServices'
import { TUser } from "../typesAndInterfaces/typesAuth";

export async function signinController(req:Request, res: Response){

    const dataSignin: TUser = {email: req.body.email, password: req.body.password}
    await authServices.signinService(dataSignin)

    return res.status(200).send("user registered successfully")
}


export async function loginController(req:Request, res: Response){

    const dataLogin = req.body
    const token = await authServices.loginServices(dataLogin)
    return res.status(200).send(token)
}