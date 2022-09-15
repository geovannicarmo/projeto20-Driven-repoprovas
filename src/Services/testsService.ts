import { TTests } from "../typesAndInterfaces/typesAuth"
import * as testsRepository from "../Repository/TestsRepository"

export async function postTestsService(dataPostTest:TTests){

    console.log(dataPostTest)

    await testsRepository.postTestsRepository(dataPostTest)

}


export async function getTestsByDisciplinesService(){

   

   const dataTestsByDisciplines = await testsRepository.getTestsByDisciplinesRepository()

   return dataTestsByDisciplines

}


export async function getTestsByTeachersService(){

   

    const dataTestsByDisciplines = await testsRepository.getTestsByTeachersRepository()
 
    return dataTestsByDisciplines
 
 }
