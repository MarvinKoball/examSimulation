import fastify from "fastify";
import cors from "@fastify/cors";
import postgres from "@fastify/postgres";
import { task } from "../../types/index";
import "reflect-metadata";
import { AppDataSource } from "./data-source";

//dont forget: tsc -w :)
const server = fastify();
server.register(cors, {
  origin: true,
});
server.register(postgres, {
  connectionString:
    "postgres://postgres:mysecretpassword@0.0.0.0:5432/postgres",
});
AppDataSource.initialize().then(async () => {
  console.log("intialized");
}).catch((err)=>{console.log("err")});

server.get("/", async (request, reply) => {
  reply.send({ hello: "worlds" });
});

server.post("/add", async (request, reply) => {
  let taskbody: task = <task>request.body;


  // hier kommen daten aus dem frontend an

  // -> hier will ich orm ansprechen mit orm.newEntry(neue Daten)

  // danach return erst mal true oder die ID von dem erstellten Objekt
  
  const client = await server.pg.connect();
  try {
    const { rows } = await client.query("INSERT INTO tasks VALUES ($1, $2)", [
      taskbody.Objectkey,
      taskbody.subject,
    ]);
    console.log("rows");
    reply.send(rows);
  } catch {
    reply.send({ message: "error" });
  }
});

// Run the server!
const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
