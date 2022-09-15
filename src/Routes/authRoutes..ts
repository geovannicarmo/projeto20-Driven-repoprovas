import { Router } from "express";
import { loginController, signinController } from "../Controllers/authController";
import {signinSchema, loginSchema} from '../Schemas/authSchema'
import schemaMiddleware from '../meddleware/schemaMeddleware'

const authRouter = Router()

authRouter.post('/signin', schemaMiddleware(signinSchema), signinController)
authRouter.post('/login', schemaMiddleware(loginSchema), loginController)

export default authRouter