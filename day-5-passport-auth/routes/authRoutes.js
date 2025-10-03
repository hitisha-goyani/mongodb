import express from "express"
import passport from  "passport"




const router = express.Router();

router.get("/login",(req,res)=>{
        res.render("login")
})

router.get("/google",
    passport.authenticate("google",{
    scope:["email","profile"]
})
)

// router.get("/google/redirect",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // Successful auth
//     res.redirect("/");
//   }
// );

export default router;