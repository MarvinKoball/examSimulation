// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')
const {task} =require('../types')

// Declare a route
fastify.register(cors,{
  origin:true
})
fastify.get('/', async (request, reply) => {
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