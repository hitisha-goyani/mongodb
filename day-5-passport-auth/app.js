

import express from "express"
import connectDB from "./config/db.js";
import httpError from "./middleware/ErrorHandler.js";


const app = express();

app.get("/",(req,res)=>{

    res.status(200).json("hello from server");
})


//undefined routes


app.use((req,res,next)=>{
    next(new httpError("requested routes not found",404))
})


//xcenterized error


app.use((error,req,res,next)=>{

    if(req.headersSent){
        next(error)
    }

    res.status(error.statusCode|| 500)
    .json(error.message || "something went wrong try again")
})
const port = 5000;

const startServer = async () =>{

    try{

        const connect = await connectDB();

        if(!connect){

            throw new Error("failed to database");
        }

        console.log("db connected");

        app.listen(port,()=>{
            console.log("server running on port",port)
        })

    }catch(error){

        console.log(error.message);
        process.exit(0);

    }
};

startServer();
