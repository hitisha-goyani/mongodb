import express from "express"

import httpError from "./middleware/ErrorHandler.js"
import connectionDb from "./db/mongoose.js"
import TaskRoutes from "./routes/TaskRoutes.js"

const app = express();


app.use(express.json());

app.use("/task",TaskRoutes) 

app.get("/",(req,res)=>{
    res.status(200).json("hello from server");
})

const port = 5000;

//undefined routes
app.use((req,res,next)=>{

    const error = res.status(404).json("requested route not found");
    next(new httpError(error));
});



//centerized error

app.use((error,req,res,next)=>{
    if(req.headersSent){
       return next(error);
    }
    res.status(error.statusCode || 500).json(error.message || "something went wrong try again");
})

async function startServer(){       
    try{

        const connect = await connectionDb();
        if(!connect){
            throw new Error("db not connecting");
        }
        app.listen(port,()=>{
            console.log("server running on port",port);
})

    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}
startServer();


