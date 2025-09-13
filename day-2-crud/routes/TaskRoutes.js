import express from "express"
import addTask from "../controller/TaskController.js";

const routes = express.Router()

routes.post("/add",addTask);

export default routes;