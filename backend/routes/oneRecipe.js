const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipeModel')
router.get('/',async (req,res)=>{
    const id = req.query.id
    const recipe = await Recipe.find({_id:id})
    if(req.cookies.uid){
        res.render('oneRecipe.ejs',{'recipe':recipe[0],'welcomeMsg':"YOU CHOOSED BEST RECIPE"})
    } else {
        res.render('oneRecipe.ejs',{'recipe':recipe[0],'welcomeMsg':null})
    }

})

module.exports = router