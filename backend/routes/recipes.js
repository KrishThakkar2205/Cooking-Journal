const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipeModel')
// /recipe route to render Recipe
router.get('/',async (req,res)=>{
    const perpage = 10;
    const page = req.query.page || 1;

    try{
        const totalRecipe = await Recipe.countDocuments();

        const recipes = await Recipe.find({})
        .skip((perpage*page)-perpage)
        .limit(perpage)
        if(req.cookies.uid){
            res.render('recipes',{welcomeMsg:'You will find all Recipes here',recipes,'current':page,'pages':Math.ceil(totalRecipe/perpage)})
        } else {
            res.render('recipes',{welcomeMsg:null,recipes,'current':page,'pages':Math.ceil(totalRecipe/perpage)})
        }
       
    }
    catch (e){
        console.log(e)
    }  
})

module.exports=router