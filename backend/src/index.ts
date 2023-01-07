import fastify from 'fastify';
import cors from "@fastify/cors";
import postgres from "@fastify/postgres";
import { task } from "../../types/index";
import "reflect-metadata";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { AppDataSource } from "./data-source";
import { addCodeArg } from "ajv/dist/compile/codegen/code";
import { taskDto } from "./entity/taskDto";
import { subjectDto } from "./entity/subjectDto";
import { sectionDto } from "./entity/sectionDto";
import { examDto } from "./entity/examDto";
import { taskTypeDto } from "./entity/taskTypeDto";
import { AfterRecover, FindManyOptions, SaveOptions, UpdateResult} from "typeorm";
import { resolve } from "path";
import { equal, rejects } from "assert";
import { request } from 'http';

const server = require('fastify')();
server.register(cors, {
  origin: true,
});



server.get("/", async (request, reply) => {
  reply.send({ hello: "worlds" });
});

server.post("/add", async (request, reply) => {
  let taskbody: task = <task>request.body;

let newTask=taskDto.addNewTaskToDb(taskbody);

reply.send({"message":"Saved a new task with id: "+(await newTask).id})

})
server.get("/sections", async( request, reply)=>{
  const repository = AppDataSource.getRepository(sectionDto);
  const results = await repository.find() as sectionDto[];
  const stringOnlyResult:string[]=[]
  results.forEach((result)=>{
    stringOnlyResult.push(result.section)
  })

  reply.send(results)

})
server.get("/by_section/:section", {
  schema: {
    params: {
      type: 'object',
      properties: {
        section: {
          type: 'string'
        }
      }
    }
  }
}, async (request:FastifyRequest, reply:FastifyReply) => {

  console.log("incomming Request");
  
  
  
  const repository = AppDataSource.getRepository(taskDto);
  const query= request.params as {section: string}
  const qq= query.section;  
  

  const results = await repository.find({relations:{section: true, subject:true, exam:true, taskType:true, pictureStream:true}, where:{section:{section:qq}}});
  console.log(results);
  
  reply.send(results);
});


// Run the server!
const start = async () => {
  try {
    await server.listen({ port: 3000, host:'192.168.178.28'});
    AppDataSource.initialize().then(()=>{console.log("intialized")}).catch((err)=>{console.log(err.message)}); 
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();



//old
/* AppDataSource.initialize().then(async () => {
  console.log("Inserting a new task into the database...");
  const firstTask=new taskDto();
  const taskRepository = AppDataSource.getRepository(taskDto)
 
  let Section =await sectionDto.checkedSection(new sectionDto("Informationsmanagement5"));
  firstTask.section=Section;
  let Exam =await examDto.checkedExam(new examDto("WS1618"));
  firstTask.exam=Exam;
  let Subject =await subjectDto.checkedSubject(new subjectDto("WInfo") );  
  firstTask.subject=Subject;
  let TaskType=await taskTypeDto.checkedtaskType(new taskTypeDto("x aus n"))
  firstTask.taskType=TaskType;
  firstTask.statement="Wissen entsteht aus Daten, die in Bezug auf einen Verwendungszweck aufbereitet werden. Der Kontext spielt dabei eine untergeordnete Rolle."
  firstTask.isCorrect=false; 
  
  await taskRepository.insert(firstTask)
  console.log("Saved a new task with id: " + firstTask.id)
  console.log("intialized"); 
}).catch((err)=>{console.log(err.message)});

super old
  const client = await server.pg.connect();
  try {
    const { rows } = await client.query("INSERT INTO tasks VALUES ($1, $2)", [
      taskbody.subject,
    ]);
    console.log("rows");
    reply.send(rows);
  } catch {
    reply.send({ message: "error" });
  }
}); */


/* server.register(postgres, {
  connectionString:
    "postgres://postgres:mysecretpassword@0.0.0.0:5432/postgres", 
}); */