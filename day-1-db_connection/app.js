import express from "express"

import connectDb from "./db/mongoose.js";
import httpError from "./middleware/ErrorHandler.js"

const app = express();

app.get("/", (req, res) => {
    res.status(200).json("hello from server");
});

//undefined routes

app.use((req, res, next) => {
    const error = res.status(404).json("requested rounte not founded");
    next(new httpError(error));

})

//centeralize error

app.use((error, req, res, next) => {
    if (req.headerSent) {
        next(error);
    }

    res
        .status(error.statusCode || 500)
        .json(error.message || "something went wrong try again later")
})

const port = 5000;


async function startServer() {
    try {

        const connect = await connectDb();

        if (!connect) {
            throw new Error("connection failed to db")
        }
        app.listen(port, () => {
            console.log("server running on", port);
        })

    } catch (error) {


        console.log(error.message);
        process.exit(1);
    }
}

startServer();

