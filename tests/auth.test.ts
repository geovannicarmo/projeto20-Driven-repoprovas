import app from '../src/index'
import supertest from 'supertest'
import {TUser} from '../src/typesAndInterfaces/typesAuth'
import {client} from '../src/dbs/pismaClient'
import userFactory from './factories/authFactory'

describe('POST/ logIn', ()=>{

    beforeEach(async () => {
        await client.$executeRaw`TRUNCATE TABLE users;`;
      });

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

        const body:any  = await userFactory()
        const signin =  await  supertest(app).post("/signin").send(body)
        const result = await  supertest(app).post("/login").send(body)
        expect(result.status).toEqual(200)
    })

    afterAll(async()=>{
        await client.$disconnect()
    })
})


describe('POST /sigin', ()=>{

    beforeEach (async()=>{
        await client.$executeRaw`TRUNCATE TABLE users;`;
    })

    it('test of test', async ()=>{


       

            const body:any  = await userFactory()
            const signin =  await  supertest(app).post("/signin").send(body)
            body.password = "passwordIcorrect"
            const result = await  supertest(app).post("/login").send(body)
            expect(result.status).toEqual(401)
        

    })





})
