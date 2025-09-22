

import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!value.includes("@gmail.com")){
                throw new Error(" invalid email");
            }
        }

    },

    password :{

        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase() === "password"){
                throw new Error("password similar as password word");
            }
        }

    }
});


//hashing password

userSchema.pre("save",async function(next){
    try{

        const user = this;

        if(user.isModified("password")){
            user.password = await bcrypt.hash(user.password,8)
        }

        console.log("password hashed");
        next();

    }catch(error)
    {
        throw new Error(error.message);
    }
})


const user = mongoose.model("user", userSchema);

export default user;