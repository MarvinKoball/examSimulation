interface task{
    id?: number;
    subject: string;
    statement:string;
    exam:string;
    taskType:string;
    section:string;
    isCorrect: boolean;
    isSelected?: boolean;
    pictureStream?: string;
}
type TaskList = {
  statements: task[];
  itemsPerPage: number;
}
 function mapIntoTask(data: any){
    let mappedTask: task = {
      id: data.id,
      section: data.section.section,
      subject: data.subject.subject,
      statement: data.statement,
      exam: data.exam.exam,
      taskType: data.taskType.taskType,
      isCorrect: data.isCorrect
    };
    
    if(null!=data.pictureStream){
        mappedTask.pictureStream=data.pictureStream.pictureStream
    } 
  
    return mappedTask;
  }

export{task, mapIntoTask, TaskList}