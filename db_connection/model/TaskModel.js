import mongoose  from "mongoose";

const TaskSchema = mongoose.Schema({
    task:{
        type:String,
        require:true,
        trim:true,
    },
    description:{
        type:String,
        require:true,
        trim:true,
    }
});

const TaskModel = mongoose.model("Task",TaskSchema);

export default  TaskModel;