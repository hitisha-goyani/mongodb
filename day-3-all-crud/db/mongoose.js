import mongoose from "mongoose";

async function connectionDb(){
    try{
       const connect = mongoose.connect("mongodb://127.0.0.1:27017/task");

    console.log("db connected");

    return connect;

    } catch(error){

    throw new Error(error.message);
}

}

export default connectionDb
