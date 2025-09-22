import express from "express"
import connectionDb from "./config/connectionDb.js";
import httpError from "./middleware/ErrorHandler.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();

app.use(express.json());

app.use("/user",userRoutes);

app.get("/",(req,res)=>{
    res.status(200).json("hello from server");
})

const port = 5000;


//undefinded error

app.use((req,res,next)=>{
    next (new httpError("requested routes  not found",404));
});

app.use((error,req,res,next)=>{
    if(req.HeadersSent){
        next(error);
    }

    res
    .status(error.statusCode || 500)
    .json(error.message || "something went wrong try again");
})

const startserver = async () =>{
    try{

        const connect = await connectionDb();

        if(!connect){
            throw new Error("failed to db")
        }
        console.log("db connected")
        app.listen(port,()=>{
            console.log("server running on port",port);
        });

    }catch(error){

        console,log(error.message);
        process.exit(1);

    }
}
startserver()