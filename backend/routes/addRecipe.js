const express = require('express')
const router = express.Router();
const Recipe = require('../models/recipeModel')
const multer  = require('multer')
const {LoggedInOrNotAddRecipe}=require('../middleware/addRecpieMW')
const path = require('path')
router.use(express.urlencoded({extended:true}))

const store = multer.diskStorage({
    destination:path.join(__dirname,"../../html/images","recipeImg"),
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }

})

var upload = multer({ storage: store })


// all the header
router.use('/',LoggedInOrNotAddRecipe)

router.get('/',(req,res)=>{
    if(req.cookies.uid){
        res.render('addRecipe',{welcomeMsg:"Add Recipe",error:null})
    } else {
        res.render('addRecipe',{welcomeMsg:null,error:'Need To Login First',})
    }
    
})


router.post('/upload',upload.single('RecipePic'),async (req,res)=>{
    
    try{ 
        const title = req.body.title
        const description = req.body.description;
        const cuisineType = req.body.cuisineType
        const servingSize = req.body.servingSize;
        const instruction = req.body.instructions
        const videoUrl = req.body.videoUrl
        let imagePath = ''
        if(req.file){
            imagePath = "/images/recipeImg/"+req.file.filename;
        }
        
        const recipe = new Recipe({
            title:title,
            description:description,
            cuisineType:cuisineType,
            servingSize:servingSize,
            instructions:instruction,
            images:imagePath,
            videoUrl:videoUrl,
            createdBy:req.user._id
        })
        await recipe.save()
        res.render('addRecipe',{welcomeMsg:"Recipe Added Successfully by "+req.user.name,error:null})
    } catch (err) {
        res.render('addRecipe',{welcomeMsg:err.message,error:null})
    }

  
})
module.exports = router;