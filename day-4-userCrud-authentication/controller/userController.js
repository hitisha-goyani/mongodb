import express from "express"
import user from "../model/UserModel.js"
import httpError from "../middleware/ErrorHandler.js"


//add user

const add = async (req,res,next) =>{

    try{

        const {name,email,password} = req.body;

        const newUser ={
            name,
            email,
            password
        }

        const saveUser = new user(newUser);

        await saveUser.save();

        if(!saveUser){
            return next(new httpError("not created user",500));
        }

        res.status(201).json({message:"user created suceesfully",saveUser});

    }catch(error){

       next(new httpError(error.message,500));

    }

}  

export default add ;
