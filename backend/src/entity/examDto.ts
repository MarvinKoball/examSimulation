import { Entity, PrimaryGeneratedColumn, ManyToOne , Column } from "typeorm"
import { AppDataSource } from "../data-source";

@Entity()
export class examDto {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public exam: string

    constructor(data: string) {
        this.exam = data;
      }
      public static async checkedExam(examToCheck:examDto){
        const examRepository = AppDataSource.getRepository(examDto)
        const oldExam =await AppDataSource.manager.findOne(examDto,{where:{exam:examToCheck.exam}});
        if (null==oldExam){
        await examRepository.insert(examToCheck);
        }
        else{
            examToCheck=oldExam;
        }

      }
}