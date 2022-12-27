interface task{
    subject: string;
    statement:string;
    exam:string;
    taskType:string;
    section:string;
    isCorrect: boolean;
    isSelected?: boolean;
}
export{task}