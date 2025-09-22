import mongoose from "mongoose";

const connectionDb = async ()=>{
    try{

        const connect = mongoose.connect("mongodb://127.0.0.1:27017/user");

        return connect;

    }catch(error)

  {  
    console.log(error.message)}
}

export default connectionDb;