import { Entity, PrimaryGeneratedColumn, ManyToOne , Column, Index ,JoinColumn } from "typeorm"
import {subjectDto} from "./subjectDto"
import {examDto} from "./examDto"
import {sectionDto} from "./sectionDto"
import {taskTypeDto} from "./taskTypeDto"
import { task } from "../../../types"
import { AppDataSource } from "../data-source";
import { pictureStreamDto } from "./picturestreamDto";



@Entity()
export class taskDto {

    @PrimaryGeneratedColumn()
    public id: number

    @ManyToOne(()=>subjectDto,(subjectDto)=>subjectDto.subject)
    @JoinColumn()
    public subject: subjectDto

    @ManyToOne(()=>examDto,(examDto)=>examDto.exam)
    @JoinColumn()
    public exam: examDto

    @ManyToOne(()=>sectionDto, (sectionDto)=>sectionDto.section)
    @JoinColumn()
    public section: sectionDto

    @ManyToOne(()=>taskTypeDto, (taskTypeDto)=>taskTypeDto.taskType)
    @JoinColumn()
    public taskType: taskTypeDto

    @ManyToOne(()=>pictureStreamDto, (pictureStreamDto)=>pictureStreamDto.pictureStream)
    @JoinColumn()
    public pictureStream: pictureStreamDto

    @Column()
    public statement: string

    @Column()
    public isCorrect: boolean

    public static async addNewTaskToDb(taskToAdd:task):Promise<taskDto>{

        console.log("Inserting a new task into the database...");
        const newTaskDto=new taskDto();
        const taskRepository = AppDataSource.getRepository(taskDto);
        
        let Section =await sectionDto.checkedSection(new sectionDto(taskToAdd.section));
        newTaskDto.section=Section;
        let Exam =await examDto.checkedExam(new examDto(taskToAdd.exam));
        newTaskDto.exam=Exam;
        let Subject =await subjectDto.checkedSubject(new subjectDto(taskToAdd.subject) );  
        newTaskDto.subject=Subject;
        let TaskType=await taskTypeDto.checkedtaskType(new taskTypeDto(taskToAdd.taskType));
        newTaskDto.taskType=TaskType;
        if(taskToAdd.pictureStream){
        let PictureStream =await pictureStreamDto.checkedSection(new pictureStreamDto(taskToAdd.pictureStream));
        newTaskDto.pictureStream=PictureStream;
        }
        newTaskDto.statement=taskToAdd.statement;
        newTaskDto.isCorrect=taskToAdd.isCorrect; 

        await taskRepository.save(newTaskDto)
         console.log("Saved a new task with id: " + newTaskDto.id)
       return newTaskDto;  
}       

    
}