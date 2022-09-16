import  express  from "express";
import "express-async-errors"
import cors from 'cors';
import dotenv from 'dotenv';
import router from './Routes/indexRoute'
import { errorHandlingMiddleware } from './meddleware/handleErrorsMiddleware'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
app.use(errorHandlingMiddleware)



export default app
