import { Entity, PrimaryGeneratedColumn, ManyToOne , Column } from "typeorm"
import "reflect-metadata";
import { AppDataSource } from "../data-source";

@Entity()
export class subjectDto {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public subject: string

    constructor(data: string) {
        this.subject = data;
        
      }

    public static async checkedSubject(subjectToCheck:subjectDto){
        const subjectRepository = AppDataSource.getRepository(subjectDto)
        const olSubject =await AppDataSource.manager.findOne(subjectDto,{where:{subject:subjectToCheck.subject}});
        if (null==olSubject){
        await subjectRepository.insert(subjectToCheck);
        }
        else{
            subjectToCheck=olSubject;
        }
      }

}