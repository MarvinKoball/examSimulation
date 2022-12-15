// Require the framework and instantiate it
import fastify from 'fastify'
import cors from '@fastify/cors'
import postgres from '@fastify/postgres'
import { task } from '../types/index'
import {addTaskDao} from './addTaskDao'
import { JsonConvert } from 'json2typescript'

// Declare a route

//dont forget: tsc -w :)

const server = fastify()
server.register(cors,{
  origin:true
}) 
server.register(postgres,{
  connectionString:'postgres://postgres:mysecretpassword@0.0.0.0:5432/postgres'
})
server.get('/', async ( request, reply) => {
  reply.send({ hello: 'worlds' })
}) 
server.post('/add',async (request, reply) => {
console.log(request.body)
const test: task=<task>request.body;
reply.send(test);
let jsonConvert:JsonConvert=new JsonConvert();
let testT:addTaskDao=jsonConvert.deserializeObject(request.body,addTaskDao)
console.log(testT);
console.log(test.subject);

//server.pg.query('INSERT INTO tasks VALUES ($1, $2)', [9,test.subject])


  
})                

// Run the server! 
const start = async () => {
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()