import { client } from "../dbs/pismaClient";
import { TUser } from "../typesAndInterfaces/typesAuth";
import { conflictError } from "../utils/errorUtils";


export async function createdNewUser(dataSignin: TUser){
    try{
        await client.user.create({
            data: dataSignin
        })
    }catch(error: any){
        if(error.code==="P2002"){
            throw conflictError("email alread registred")
        }
        throw 'error'
    }
}

export async function getUser(email: string){

    return await client.user.findUnique({

        where:{email}
    })

}

export async function getUserByIdRepository(id: number){

    return await client.user.findUnique({

        where:{id}
    })

}