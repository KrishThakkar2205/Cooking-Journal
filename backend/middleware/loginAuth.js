const User = require('../models/userModel');
const {getUser} = require('../service/auth')
async function restrictedForLoggedIn(req,res,next){
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect('/login',{errMessage:null,welcomeMsg:null})
    
    const user = getUser(userUid);

    if(!user) return res.redirect('/login',{errMessage:null,welcomeMsg:null})
    req.user = user 
    next()
}

// Middleware for the Header Login
async function LoggedInOrNotHeader(req,res,next){
    const userUid = req.cookies?.uid;
    if(!userUid){ return res.render('index1',{welcomeMsg:null})}
    console.log(userUid)
    const user = await getUser(userUid);
    // console.log(user)
    if(!user){ return res.render('index1',{welcomeMsg:null})}
    req.user = user 
    next()
}

module.exports = {
    LoggedInOrNotHeader,
    restrictedForLoggedIn,
}