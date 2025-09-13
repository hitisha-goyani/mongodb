import TaskModel from "../model/TaskModel.js"
import httpError from "../middleware/ErrorHandler.js"

const addTask = (req,res)=>{

    try{

        const {task,description} = res.body

        const newTask ={
            task,
            description,
        };


        const saveTask = new TaskModel(newTask)

        res.status(201).json({message:"new task data added",saveTask})

    }catch(error){

        new httpError(error.message)
    }

}

export default addTask;