const express = require("express");
const router = express.Router();
const User = require('../models/userModel')
let sessionId = 'null'
const cookie = require('cookie-parser')
const {v4 : uuidv4} = require('uuid')



router.use(cookie())

router.use(express.urlencoded({extended:true}))

router.get('/',(req,res)=>{
    res.render('login.ejs',{errorMessage:null,welcomeMsg:null})
});


// When user Login request is Generated
router.post('/',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password
    try{
        const data = await User.findOne({email,password})

        if(!data){
            res.render('login',{errorMessage: "User do not exists or Password Mismatch",welcomeMsg:null})
        }
        // Create a session ID
        sessionId = uuidv4()
        
        // Generarting a Cookie
        res.cookie("uid", sessionId)

        
       
        await User.updateOne(
            {email,password},
            {sessionId:sessionId}
        )

        // Redirecting to Home Page
        res.redirect('/')
    } catch(err){
        console.log("Unexpected Error "+err)
        res.status(500).render('login', {errorMessage: "User do not exists or Password Mismatch",welcomeMsg:null})
    }
    
})


router.get('/signup',(req,res)=>{
    res.render('signup',{
        errorMessage: null,welcomeMsg:null})
})



// When SignUp request is generated 
router.post('/signup', async (req, res) => {
    const UserName = req.body.name;
    const Email = req.body.email;
    const profession = req.body.profession;
    const password = req.body.password;
    const data = await User.find({})
    for(let i of data){
        if(i.name===UserName && Email === i.email){
            console.log("User Name Already exist")
            res.status(500).render('signup', {errorMessage: "User already exists", welcomeMsg:null})
            break;
        }
    }
    try {
        sessionId = uuidv4()
        
        // Generarting a Cookie
        

        const newUser = new User({
            name: UserName,
            email: Email,
            profession: profession,
            password: password,
            sessionId:sessionId,
        });
        const user = await newUser.save();
        res.cookie("uid", sessionId)
        res.redirect('/');
    } catch (err) {
        console.log("Unexpected Error Occurred: " + err.message);
        res.status(500).render('signup', {
            errorMessage: err.message,welcomeMsg:null})  
    }
});

module.exports = router;