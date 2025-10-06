import express from "express"
import passport from  "passport"




const router = express.Router();

router.get("/login",(req,res)=>{
    if(req.user){
        res.redirect("/profile")
    }else {
        res.render("login")
    }
        
})

router.get("/google",
    passport.authenticate("google",{
    scope:["email","profile"]
})
)

// router.get("/redirect",passport.authenticate("google"),(req,res)=>{
//     res.redirect("/profile");
// });

// router.get("/logout",(req,res)=>{
//     req.logout((err)=>{
//         if(err){
//             return res.status(500).json("failed to logout");
//         }
//     });
//     res.redirect("/");
// })

router.get("/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json("failed to logout");
//     }
//   });
//   res.redirect("/");
// });


router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json("Failed to logout");
    }
    res.redirect("/"); // move this inside the callback
  });
});



export default router;