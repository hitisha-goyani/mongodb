
import httpError from "../middleware/ErrorHandler.js";
import TaskModel from "../model/TaskModel.js";

const addTask = ()=>{
    try{

        const {task,description } = res.body

        const newTask = {
            task,
            description
        };

        const saveTask = new TaskModel(newTask);

        r̥es.status(201).json({message:"new task data added",saveTask})
    }catch(error){
        new httpError(error.message)
    }
}

export default addTask;