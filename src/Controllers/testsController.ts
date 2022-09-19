import { Request, Response } from "express";
import * as testsServices from '../Services/testsService'


export async function postTestsController(req:Request, res: Response){

   

    const dataPostTest = req.body

    await testsServices.postTestsService(dataPostTest)
        
    return res.status(200).send("test registered successfully")
}

export async function getTestsByDisciplinesController(req:Request, res: Response){

    const dataTestsByDisciplines = await testsServices.getTestsByDisciplinesService()

    return res.status(200).send(dataTestsByDisciplines)
}

export async function getTestByTeachersController(req:Request, res: Response){

    const dataTestsByDisciplines = await testsServices.getTestsByTeachersService()

    return res.status(200).send(dataTestsByDisciplines)
}