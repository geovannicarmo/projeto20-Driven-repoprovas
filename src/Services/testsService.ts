import { TTests } from "../typesAndInterfaces/typesAuth"
import * as testsRepository from "../Repository/TestsRepository"
import { notFoundError } from "../utils/errorUtils"

export async function postTestsService(dataPostTest:any){

    const idsTeacherAndDisciplineld = {
        teacherId: Number(dataPostTest.teacherId),
        disciplineId: Number(dataPostTest.disciplineId)
    }

    const TeachersDisciplines = await testsRepository.isTeachersDisciplines(idsTeacherAndDisciplineld)

    if(!TeachersDisciplines){
        throw notFoundError("not found teachersDisciplines")
    }

    const dataTests = {
        name: dataPostTest.name,
        pdfUrl: dataPostTest.pdfUrl,
        categoryId: Number(dataPostTest.categoryId),
        teacherDisciplineldId: TeachersDisciplines.id
    }

    await testsRepository.postTestsRepository(dataTests)
    return

}

export async function getTestsByDisciplinesService(){

   const dataTestsByDisciplines = await testsRepository.getTestsByDisciplinesRepository()
   return dataTestsByDisciplines

}


export async function getTestsByTeachersService(){

    const dataTestsByDisciplines = await testsRepository.getTestsByTeachersRepository() 
    return dataTestsByDisciplines
 
 }
