// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
import cors from '@fastify/cors'
import { task } from '../types/index'

// Declare a route
fastify.register(cors,{
  origin:true
})
fastify.get('/', async ( reply:any) => {
  let response: task={Objectkey:"abcd",suject:"WINFO"}
  reply.send({ hello: 'world' })
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()