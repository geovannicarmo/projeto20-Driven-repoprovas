import { faker } from '@faker-js/faker';
import { prisma } from '@prisma/client';
import { client } from '../src/dbs/pismaClient';


async function main() {
   
    await client.terms.createMany({

        data:[
            {number: 1},
            {number: 2},
            {number: 3},
            {number: 4},
            {number: 5},
            {number: 6}
        ],
        skipDuplicates: true
    })

    
    await client.categories.createMany({
      
      data:[
        {name: "Projeto"},
        {name: "Prática"},
        {name: "Prática"},
        
      ],
      skipDuplicates: true
    })


    await client.teachers.createMany({

      data:[
          {name: "Diego Pinho"},
          {name: "Bruna Hamori"}
    
      ],
      skipDuplicates: true
  })

  await client.discipline.createMany({

    data:[
        {termId: 1, name: "HTML e CSS", },
        {termId: 2, name: "JavaScript",},
        {termId: 3, name: "React",},
        {termId: 1, name: "Humildade",},
        {termId: 2, name: "Planejamento",},
        {termId: 3, name: "Autoconfiança",},
  
    ],
    skipDuplicates: true
})

await client.teachersDisciplines.createMany({

  data:[
      {teacherId: 1, disciplineId: 1, },
      {teacherId: 1, disciplineId: 2,},
      {teacherId: 1, disciplineId: 3,},
      {teacherId: 2, disciplineId: 4,},
      {teacherId: 2, disciplineId: 5,},
      {teacherId: 2, disciplineId: 6,},

  ],
  skipDuplicates: true
})


}


main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    client.$disconnect();
  })