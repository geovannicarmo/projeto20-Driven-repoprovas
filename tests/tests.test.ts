import { array } from "joi";
import supertest from "supertest";
import app from "../src";
import { client } from "../src/dbs/pismaClient";
import {signFactory} from './factories/authFactory'

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async()=>{
    await client.$disconnect()
})



describe('GET /testsByDiscipline', ()=>{
    
    
    
    it('token incorrect', async()=>{
          
        const token = "vsdfzvczdvdxbzfd"
          
          const result = await supertest(app).get("/getTestsByDiscipline").set('Authorization', `Bearer ${token}`).send()
        expect(result.status).toEqual(401)
    })

    it('did not send token', async()=>{

        const result = await supertest(app).get("/getTestsByDiscipline").send()
        expect(result.status).toEqual(401)
    })
    
    it('return grouped tests', async()=>{

        const body:any  = await signFactory()
        const signin =  await  supertest(app).post("/signin").send(body)
        delete body.passwordConfirm
        const token = (await  supertest(app).post("/login").send(body)).text
        
        const result = await supertest(app).get("/getTestsByDiscipline").set('Authorization', `Bearer ${token}`)
        console.log(result.body)
        expect(result.status).toEqual(200)
        expect(result.body).toBeInstanceOf(Array)
    })
    
})