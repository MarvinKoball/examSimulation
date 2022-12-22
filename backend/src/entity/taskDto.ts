import { Entity, PrimaryGeneratedColumn, ManyToOne , Column, Index ,JoinColumn } from "typeorm"
import {subjectDto} from "./subjectDto"
import {examDto} from "./examDto"
import {sectionDto} from "./sectionDto"
import {taskTypeDto} from "./taskTypeDto"


@Entity()
@Index(['subject','exam','section', 'taskType'],{unique:true})
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

    @Column()
    public statement: string

    @Column()
    public isCorrect: boolean

}