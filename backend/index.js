"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require the framework and instantiate it
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const postgres_1 = __importDefault(require("@fastify/postgres"));
const addTaskDao_1 = require("./addTaskDao");
const json2typescript_1 = require("json2typescript");
// Declare a route
//dont forget: tsc -w :)
const server = (0, fastify_1.default)();
server.register(cors_1.default, {
    origin: true
});
server.register(postgres_1.default, {
    connectionString: 'postgres://postgres:mysecretpassword@0.0.0.0:5432/postgres'
});
server.get('/', async (request, reply) => {
    reply.send({ hello: 'worlds' });
});
server.post('/add', async (request, reply) => {
    console.log(request.body);
    const test = request.body;
    let jsonConvert = new json2typescript_1.JsonConvert();
    let testT = jsonConvert.deserializeObject(test, addTaskDao_1.addTaskDao);
    console.log(testT);
    //server.pg.query('INSERT INTO tasks VALUES ($1, $2)', [9,test.subject])
    reply.send(test);
});
// Run the server! 
const start = async () => {
    try {
        await server.listen({ port: 3000 });
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
