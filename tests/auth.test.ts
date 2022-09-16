import app from '../src/index'
import supertest from 'supertest'
import {TUser} from '../src/typesAndInterfaces/typesAuth'
import {client} from '../src/dbs/pismaClient'
import {userFactory, signFactory} from './factories/authFactory'


beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users;`;
  });
  
afterAll(async()=>{
    await client.$disconnect()
})

describe('POST/ logIn', ()=>{


    it('non-standard email', async ()=>{

        const body:TUser ={
            email: "naosouemail",
            password: "123" 
        }
        const result = await  supertest(app).post("/login").send(body)
        expect(result.status).toEqual(422)
    })

    it('non-standard password', async ()=>{

        const body:TUser ={
            email: "emailQualquer@gmail.com",
            password: "123" 
        }
        const result = await  supertest(app).post("/login").send(body)
        expect(result.status).toEqual(422)
    })

    it('login with unregistered email', async ()=>{

        const body:any  = await userFactory()
        const result = await  supertest(app).post("/login").send(body)
        expect(result.status).toEqual(401)
    })

    it('login with registered email but incorrect password', async ()=>{

        const body:any  = await userFactory()
        const signin =  await  supertest(app).post("/signin").send(body)
        body.password = "passwordIcorrect"
        const result = await  supertest(app).post("/login").send(body)
        expect(result.status).toEqual(401)
    })

    it('login valid', async ()=>{

        const body:any  = await signFactory()
        const signin =  await  supertest(app).post("/signin").send(body)
        delete body.passwordConfirm
        const result = await  supertest(app).post("/login").send(body)
        expect(result.status).toEqual(200)
    })

})


describe('POST /signin', ()=>{



    it('non-standard email', async ()=>{

        const body:any ={
            email: "naosouemail",
            password: "12345678",
            passwordConfirm: "12345678"
            
        }
        const result = await  supertest(app).post("/signin").send(body)

        expect(result.status).toEqual(422)
    })

    it('non-standard password', async ()=>{

        const body:any ={
            email: "emailQualquer@gmail.com",
            password: "123",
            passwordConfirm: "123"
        }
        const result = await  supertest(app).post("/signin").send(body)
        expect(result.status).toEqual(422)
    })

    it('password different from passwordConfirm', async ()=>{

        const body:any ={
            email: "emailQualquer@gmail.com",
            password: "12345678",
            passwordConfirm: "87654321"
        }
        const result = await  supertest(app).post("/signin").send(body)
        expect(result.status).toEqual(422)
    })

    it('password different from passwordConfirm', async ()=>{

        const body:any ={
            email: "emailQualquer@gmail.com",
            password: "12345678",
            passwordConfirm: "87654321"
        }
        const result = await  supertest(app).post("/signin").send(body)
        expect(result.status).toEqual(422)
    })

    it('email already registered', async ()=>{

        const body = await signFactory()
        await  supertest(app).post("/signin").send(body)
        const result = await  supertest(app).post("/signin").send(body)
        expect(result.status).toEqual(409)
    })

    it('All right', async ()=>{

        const body = await signFactory()
        const result = await  supertest(app).post("/signin").send(body)
        expect(result.status).toEqual(200)
    })



})
