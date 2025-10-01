import mongoose from "mongoose"


const connectDB = async() =>{
    try{

        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/authuser");

        return connect;

    }catch(error){

        console.log(error.message);

    }
}

export default connectDB;