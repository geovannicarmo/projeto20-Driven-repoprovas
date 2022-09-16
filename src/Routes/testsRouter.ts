import { Router } from "express";
import { postTestsController, getTestsByDisciplinesController, getTestByTeachersController } from "../Controllers/testsController";
import verifyTokenMiddlewerw from "../meddleware/verifyTokenMiddlewerw";
import schemaMiddleware from "../meddleware/schemaMeddleware";
import {testSchema} from '../Schemas/testsSchema'


const testsRouter = Router()


testsRouter.post('/tests',schemaMiddleware(testSchema), verifyTokenMiddlewerw, postTestsController)
testsRouter.get('/getTestsByDiscipline', verifyTokenMiddlewerw, getTestsByDisciplinesController)
testsRouter.get('/getTestsByTeacher', verifyTokenMiddlewerw, getTestByTeachersController)

export default testsRouter