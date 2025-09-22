
import httpError from "../middleware/ErrorHandler.js";
import TaskModel from "../model/TaskModel.js";

const addTask = async (req,res) =>{
    try{
        const {task,description} = req.body;
        const newTask ={
            task,
            description
        };

        const savedTask = new TaskModel(newTask);

        await savedTask.save();

        res.status(201).json({message:"new task added",savedTask})
    }catch(error){
        next(new httpError(error.message,400))
    }
};

const getAllTask = async (req,res,next) =>{

    try{
        const taskData = await TaskModel.find({});
        if(!taskData){
            return next(new httpError("task data not found",404))
        }

        res.status(200).json({message:"all task data",taskData})

    }catch(error){
        next(new httpError(error.message,400));
    }
};

const getSpecificTask = async (req,res,next)=>{
    try{
        const id = req.params.id;

        const existingTask = await TaskModel.findById(id);
        if(!existingTask){
            return next(new httpError("task not found",404))
        }

        res.status(200).json({message:"task found",existingTask});

    }catch(error){
        next(new httpError(error.message,400))
    }

}

const deleteTask = async(req,res,next) =>{
   try{
     const id = req.params.id;
        const deleteTask = await TaskModel.findByIdAndDelete(id);

        if(!deleteTask){
            return next(new httpError("id not found",404));

        }

        res.status(200).json({message:"task data deleted"});
   }catch(error){

    next(new httpError(error.message,400))

   }
};


const updateTask = async(req,res,next)=>{

    try{
        const id = req.params.id;
        const  exitingTask = await TaskModel.findById(id);

    if(!exitingTask){
        return next(new httpError("id not found",404))
    }

    const updates = Object.keys(req.body);
    const allowFiled = ["task","description"];

    const isValidUpdate = updates.every((field)=>allowFiled.includes(field));

    if(!isValidUpdate){
        return next(new httpError("only allowed field can be updated",400))
    }

    updates.forEach((update)=>{
        exitingTask[update] = req.body[update];
    });

    await exitingTask.save();

    res.status(200).json({message:"task updated",exitingTask});
    }catch(error){

        next(new httpError(error.message));

    }
}

export default {addTask,getAllTask,getSpecificTask,deleteTask,updateTask };