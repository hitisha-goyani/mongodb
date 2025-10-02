import dotenv from "dotenv";
dotenv.config({path:"./.dev.env"});


import passport from "passport"
import passportGoogle from "passport-google-oauth20";
import User from "../model/User.js";

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.G_CLITET_ID,
            clientSecret:process.env.G_CLITET_SECRET,
            callbackURL:"/auth/google/redirect",

        },
        async(accessToken,refreshToken,profile,done)=>{
            try{
                  // If user doesn't exist creates a new user. (similar to sign up)
                const user = await User.findOne({googleId:profile.id});

                if(!user){
                    const newUser = await User.create({
                      googleId:profile.id,
                      name:profile.displayName,
                      email:profile.emails?.[0].value,
                       // we are using optional chaining because profile.emails may be undefined.
                    });
                    if(newUser){
                        done(null,newUser);
                    }
                    else{
                        done(null,user);
                    }
                }


            }catch(error){

            }
        }


    )
)

