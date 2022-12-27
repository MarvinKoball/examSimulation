import { Entity, PrimaryGeneratedColumn, ManyToOne , Column } from "typeorm"
import { AppDataSource } from "../data-source";


@Entity()
export class sectionDto {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public section: string

    constructor(data: string) {
        this.section = data;
      }

      public static async checkedSection(sectionToCheck: sectionDto ):Promise<sectionDto>{
        const subjectRepository = AppDataSource.getRepository(sectionDto)
        const oldSection =await AppDataSource.manager.findOne(sectionDto,{select:{id:true, section:true},where:{section:sectionToCheck.section}});
        if (null==oldSection){
         sectionToCheck=await (subjectRepository.save(sectionToCheck));
         }
        else{
            sectionToCheck=oldSection;
        }
        return sectionToCheck;
      }      
}