import jwt from "jsonwebtoken";

import httpError from "./ErrorHandler.js";
import User from "../model/UserModel.js";


const auth = async(req,res,next) =>{

    try{

        const authHeader = req.header("Authorization");


        if(!authHeader){
            return next(new httpError("Authorization failed",400))
        }

        const token = authHeader.replace("Bearer ","");

        const decode = jwt.verify(token,"authToken");

        const user  = await User.findOne({_id:decode._id,"tokens.token":token});

        if(!user){
            return next(new httpError("authorization failed",400))                                                                                                                      
        }

        req.user= user;
        

        req.token = token;

        next();

    }catch(error){

        next(new httpError(error.message));

    }

}

export default auth;
