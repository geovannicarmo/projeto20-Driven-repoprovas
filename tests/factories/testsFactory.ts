import { faker } from "@faker-js/faker";

export async function inputsTestsFaker(){

    const dataTestFaker = {
        name: faker.lorem.word(),
        pdfUrl: faker.internet.url(),
        categoryId: faker.datatype.number({min:1, max:3, precision:1}),
        disciplineId:1,
        teacherId:1
    }

    return dataTestFaker}
