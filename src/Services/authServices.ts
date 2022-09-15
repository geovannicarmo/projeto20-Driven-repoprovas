import bcript from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TUser } from '../typesAndInterfaces/typesAuth';
import * as authRepository from '../Repository/authRepository'
import { unauthorizedError, internalServerError} from '../utils/errorUtils';

export async function signinService(dataSignin: TUser){

    const salt = 10
    dataSignin.password =  bcript.hashSync(dataSignin.password, salt)


    await authRepository.createdNewUser(dataSignin)
}

export async function loginServices(dataLogin: TUser) {

    const dataUser = await authRepository.getUser(dataLogin.email)

    if(!dataUser){
        throw unauthorizedError("email or password incorrect")
    }

    const passwordVerify = bcript.compareSync(dataLogin.password, dataUser.password)

    if(!passwordVerify){
        throw unauthorizedError("email or password incorrect")
    }

    const SECRET = process.env.SECRET
    if(typeof(SECRET)!=="string"){
        throw internalServerError("Internal Server Error")
    }
    const data = dataUser.id
    const config = {expiresIn: 60*60}
    const token = jwt.sign({data}, SECRET, config)

    
    
    return {token}
}

export async function getUserByIdServices(idUser: number) {

    const dataUser = await authRepository.getUserByIdRepository(idUser)

    if(!dataUser){
        throw unauthorizedError("invalid token")
    }

}
