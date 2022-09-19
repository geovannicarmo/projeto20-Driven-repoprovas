import { array } from "joi";
import supertest from "supertest";
import app from "../src";
import { client } from "../src/dbs/pismaClient";
import {signFactory} from './factories/authFactory'
import { inputsTestsFaker } from './factories/testsFactory'

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
        expect(result.status).toEqual(200)
        expect(result.body).toBeInstanceOf(Array)
    })
    
})

describe('GET /getTestsByTeacher', ()=>{
    
    
    
    it('token incorrect', async()=>{
          
        const token = "vsdfzvczdvdxbzfd"
          
          const result = await supertest(app).get("/getTestsByTeacher").set('Authorization', `Bearer ${token}`).send()
        expect(result.status).toEqual(401)
    })

    it('did not send token', async()=>{

        const result = await supertest(app).get("/getTestsByTeacher").send()
        expect(result.status).toEqual(401)
    })
    
    it('return grouped tests', async()=>{

        const body:any  = await signFactory()
        const signin =  await  supertest(app).post("/signin").send(body)
        delete body.passwordConfirm
        const token = (await  supertest(app).post("/login").send(body)).text
        const result = await supertest(app).get("/getTestsByDiscipline").set('Authorization', `Bearer ${token}`)
        expect(result.status).toEqual(200)
        expect(result.body).toBeInstanceOf(Array)
    })
    
})

describe('POST /tests', ()=>{


    it('token incorrect', async()=>{
          
        const token = "vsdfzvczdvdxbzfd"

        const result = await supertest(app).get("/getTestsByDiscipline").set('Authorization', `Bearer ${token}`).send()
        expect(result.status).toEqual(401)
    })


    it('correct token and a valid teacher and discipline combination', async()=>{

        const body:any  = await signFactory()
        await  supertest(app).post("/signin").send(body)
        delete body.passwordConfirm
        const token = (await  supertest(app).post("/login").send(body)).text

                
        const dataTestFaker = await inputsTestsFaker()
        
        const result = await supertest(app).post("/tests").set('Authorization', `Bearer ${token}`).send(dataTestFaker)


        expect(result.status).toEqual(200)
    })

    it('correct token and a invalid teacher and discipline combination', async()=>{

        const body:any  = await signFactory()
        await  supertest(app).post("/signin").send(body)
        delete body.passwordConfirm
        const token = (await  supertest(app).post("/login").send(body)).text

                
        const dataTestFaker = await inputsTestsFaker()
        dataTestFaker.disciplineId=6
        dataTestFaker.teacherId=1
        
        const result = await supertest(app).post("/tests").set('Authorization', `Bearer ${token}`).send(dataTestFaker)
        expect(result.status).toEqual(404)
    })

    it('imput invalid', async()=>{

        const body:any  = await signFactory()
        await  supertest(app).post("/signin").send(body)
        delete body.passwordConfirm
        const token = (await  supertest(app).post("/login").send(body)).text
      
        const dataTestFaker = await inputsTestsFaker()
        dataTestFaker.pdfUrl = "not url"
        
        const result = await supertest(app).post("/tests").set('Authorization', `Bearer ${token}`).send(dataTestFaker)
        expect(result.status).toEqual(422)
    })



})