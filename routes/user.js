const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
 
router.get("/signup", (req,res) =>{
    res.render("users/signup.ejs");
});

router.post("/signup" , wrapAsync(async(req,res) =>{
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email,username});
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.flash("success", "Welcome to WanderLust!");
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    })
);

router.get("/login",
    (req,res) => {
    res.render("users/login.ejs");  
});
router.post("/login",
    passport.authenticate("local" ,{
        failureRedirect:'/login' , 
        failureFlash:true // flash krega msg if failed to login
    }), 
    async(req,res) =>{
        res.flash("success" ,"Welcome back to WanderLust!");
        res.redirect("/listings");
    }
);

router.get("/logout", (req,res) => { //this is my logout route
    req.logout((err) => {
        if(err){
            next(err);
        }
        req.flash("success", "you are logged out !");
        res.redirect("/listings");
    })
})

module.exports = router;