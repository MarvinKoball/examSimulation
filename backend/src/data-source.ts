import "reflect-metadata";
import { DataSource } from "typeorm";
import { examDto } from "./entity/examDto";
import { pictureStreamDto } from "./entity/picturestreamDto";
import { sectionDto } from "./entity/sectionDto";
import { subjectDto } from "./entity/subjectDto";
import { taskDto } from "./entity/taskDto";
import { taskTypeDto } from "./entity/taskTypeDto";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "0.0.0.0",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [taskDto, sectionDto, taskTypeDto, examDto, subjectDto, pictureStreamDto],
  migrations: [],
  subscribers: [],
});
