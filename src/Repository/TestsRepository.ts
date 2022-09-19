import { TTests } from "../typesAndInterfaces/typesAuth";
import { client } from "../dbs/pismaClient";

export async function postTestsRepository(dataPostTest: TTests){

   const postTest =  await client.tests.create({
        data: dataPostTest
    })

    console.log(postTest)
}

export async function isTeachersDisciplines(idsTeacherAndDisciplineld: any){

    return await client.teachersDisciplines.findFirst({
        where: idsTeacherAndDisciplineld
    })
}




export async function getTestsByDisciplinesRepository(){

    return await client.terms.findMany({
        include: {
            Discipline: {
                include: {
                    TeachersDisciplines: {
                        include: {
                            Teachers: true,
                                Tests: {
                                    include: {
                                        category: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    })
}





export async function getTestsByTeachersRepository(){

    return await client.teachers.findMany({


        select:{
            name:true,
            id: true,
            TeachersDisciplines:{ 
                select: {
                    id: true,
                    Tests:{
                                            
                    }
                }   
            }
        }
                                

    })
}