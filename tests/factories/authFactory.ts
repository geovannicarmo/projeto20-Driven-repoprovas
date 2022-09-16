import { faker } from '@faker-js/faker'


export  async function userFactory(){
    return{

             email: faker.internet.email(),
             password: faker.internet.password(8)
    }
}

export  async function signFactory(){

    const email = faker.internet.email()
    const password = faker.internet.password(8)

    return{

             email,
             password,
             passwordConfirm: password
    }
}
