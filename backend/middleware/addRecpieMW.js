const User = require('../models/userModel');
const {getUser} = require('../service/auth')

async function LoggedInOrNotAddRecipe(req,res,next){
    const userUid = req.cookies?.uid;
    if(!userUid){ return res.render('addRecipe',{welcomeMsg:null,error:"LOGIN REQUIRED"})}
    console.log(userUid)
    const user = await getUser(userUid);
    // console.log(user)
    if(!user){ return res.render('addRecipe',{welcomeMsg:null,error:"LOGIN REQUIRED"})}
    req.user = user 
    next()
}

module.exports = {
    LoggedInOrNotAddRecipe,
}