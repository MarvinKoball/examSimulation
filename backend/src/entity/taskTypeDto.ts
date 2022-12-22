import { Entity, PrimaryGeneratedColumn, ManyToOne , Column } from "typeorm"
import { AppDataSource } from "../data-source";


@Entity()
export class taskTypeDto {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public taskType: string

    constructor(data: string) {
        this.taskType = data;
      }

      public static async checkedtaskType(taskTypeToCheck:taskTypeDto){
        const taskTypeRepository = AppDataSource.getRepository(taskTypeDto)
        const oldTaskType =await AppDataSource.manager.findOne(taskTypeDto,{where:{taskType:taskTypeToCheck.taskType}});
        if (null==oldTaskType){
        await taskTypeRepository.insert(taskTypeToCheck);
        }
        else{
            taskTypeToCheck=oldTaskType;
        }
      }      
}