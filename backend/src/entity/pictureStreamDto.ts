import { Entity, PrimaryGeneratedColumn, ManyToOne , Column , JoinColumn  } from "typeorm"
import { AppDataSource } from "../data-source";


@Entity()
export class pictureStreamDto {
    @PrimaryGeneratedColumn()
    public id: number
    
    @Column()
    public pictureStream: string


    constructor(data: string) {
        this.pictureStream = data;
      }

      public static async checkedSection(pictureStreamToCheck: pictureStreamDto ):Promise<pictureStreamDto>{
        const subjectRepository = AppDataSource.getRepository(pictureStreamDto)
        const oldSection =await AppDataSource.manager.findOne(pictureStreamDto,{select:{id:true, pictureStream:true},where:{pictureStream:pictureStreamToCheck.pictureStream}});
        if (null==oldSection){
            pictureStreamToCheck=await (subjectRepository.save(pictureStreamToCheck));
         }
        else{
            pictureStreamToCheck=oldSection;
        }
        return pictureStreamToCheck;
      }    
}