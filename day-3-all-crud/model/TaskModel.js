import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({

    task:{
        type:String,
        require:true,
        trim:true
    },
    description:{
        type:String,
        require:true,
        trim:true,
    }
})


const TaskModel = mongoose.model("tasks",TaskSchema)

export default TaskModel;