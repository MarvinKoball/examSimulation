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

    public static async checkedSubject(subjectToCheck:subjectDto):Promise<subjectDto>{
        const subjectRepository = AppDataSource.getRepository(subjectDto)
        const olSubject =await AppDataSource.manager.findOne(subjectDto,{where:{subject:subjectToCheck.subject}});
        if (null==olSubject){
        subjectToCheck =await subjectRepository.save(subjectToCheck);
        //subjectToCheck =await AppDataSource.manager.findOne(subjectDto,{where:{subject:subjectToCheck.subject}})
        }
        else{
            subjectToCheck=olSubject;
        }
        return subjectToCheck
      }

}