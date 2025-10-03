import express from "express"
import User from "../model/UserModel.js"
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

        const saveUser = new User(newUser);

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

        const user = await User.findByCreadiantials(email,password);

        if(!user){
            return next(new httpError("unable to login",400))
        }

        const token = await user.generateAuthUser();

        res.status(200).json({message:"login successfully",user,token});

    }catch(error){

        next(new httpError(error.message,500))

    }
}


//auth login

const authLogin = async (req,res,next) =>{

    try{
        const user = req.user;

        res.status(200).json({message:"user login sucessfully",user})
    }
    catch(error){
        next(new httpError(error.message,500))
    }
}


//auth logout

const logOut = async (req,res,next) => {
    try{

        req.user.tokens = req.user.tokens.filter((t)=>{
         return t.token !== req.token;
        });

        await req.user.save();

        res.status(200).json({message:"user logout sucessfully"});
        
    }catch(error){

        next(new httpError(error.message));
         
    }

};

// logOut all 

const logOutAll = async (req,res,next)=>{

    try{

         req.user.tokens=[];

         await req.user.save();

         res.status(200).json({message:"user logout successully from all device.."})

    }catch(error){

        next (new httpError(error.message))
       
    }

};


// update 

const update = async (req,res,next)=>{
    try{

        const {name,email,password} = req.body;

        const user = await User.findOne({email});

    if(user){
     

        return next(new httpError("user with this email id already exits..",400));
    }

    const updates = Object.keys(req.body);

    const allowedUpdate = ["name","email","password"];

    const isValid = updates.every((field) => allowedUpdate.includes(field));


    if(!isValid){
        return next(new httpError("only allowed fields can be update",400))
    }

    updates.forEach((update)=>{
        req.user[update] = req.body[update];
    });

    await req.user.save();

    res.status(200).json({message:"user data updated",user:req.user});

    }catch(error){
        next (new httpError(error.message,500));
    }


}
export default { add,login,authLogin,logOut,logOutAll,update};
