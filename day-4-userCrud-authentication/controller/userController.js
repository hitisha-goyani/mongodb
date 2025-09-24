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

        const token =  await saveUser.generateAuthUser();

        await saveUser.save();

        if(!saveUser){
            return next(new httpError("not created user",500));
        }

        res.status(201).json({message:"user created suceesfully",saveUser,token});

    }catch(error){

       next(new httpError(error.message,500));

    }

}  

//login 

const login = async(req,res,next) =>{
    try{
        const {email,password} = req.body;

        const use = await user.findByCreadiantials(email,password);

        if(!use){
            return next(new httpError("unable to login",400))
        }

        const token = await use.generateAuthUser();

        res.status(200).json({message:"login successfully",use,token});

    }catch(error){

        next(new httpError(error.message,500))

    }
}


//auth login

const authLogin = async (req,res,next) =>{

    try{
        const user = req.use;

        res.status(200).json({message:"user login sucessfully",user})
    }
    catch(error){
        next(new httpError(error.message,500))
    }
}

export default { add,login,authLogin};
