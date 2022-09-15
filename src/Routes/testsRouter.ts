import { Router } from "express";
import { postTestsController, getTestsByDisciplinesController, getTestByTeachersController } from "../Controllers/testsController";
import verifyTokenMiddlewerw from "../meddleware/verifyTokenMiddlewerw";


const testsRouter = Router()


testsRouter.post('/tests', verifyTokenMiddlewerw, postTestsController)
testsRouter.get('/getTestsByDiscipline', verifyTokenMiddlewerw, getTestsByDisciplinesController)
testsRouter.get('/getTestsByTeacher', verifyTokenMiddlewerw, getTestByTeachersController)

export default testsRouter