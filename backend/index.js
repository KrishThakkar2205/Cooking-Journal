const express = require('express')
const app = express()
const path = require('path')
const loginSignup = require('./routes/LoginSignup')
const cookie = require('cookie-parser')
const {LoggedInOrNotHeader} = require('./middleware/loginAuth')
const addRecipe = require('./routes/addRecipe')
const recipes = require('./routes/recipes')
const logout = require('./routes/logout')
const oneRecipe = require('./routes/oneRecipe')
const Recipe = require('./models/recipeModel')


// Cookie-Parser
app.use(cookie())

// Setting the view engine to ejs
app.set('view engine','ejs')

// Giving the Static Path for the static files
app.use(express.static(path.join(__dirname,'..','html')))

// Giving path till html folder to be considered as views
app.set('views',path.join(__dirname,'..','html'))


// For Login and SignUp Form
app.use('/LoginSignup',loginSignup)

// For Add Recpie Paths
app.use('/addrecipe',addRecipe)

// For Recipes Path
app.use('/recipes',recipes)

// For Particular Recipe 
app.use('/recipe',oneRecipe)

// For Logout
app.use('/logout',logout)



app.get('/search',async(req,res)=>{
    const Find = req.query.searchterm
    const recipes = await Recipe.find({title: { $regex: Find, $options: 'i' }})
    if(req.cookies.uid){
        res.render('recipes',{welcomeMsg:"Searching for "+Find,recipes,'current':null,'pages':null})
    } else {
        res.render('recipes',{welcomeMsg:null,recipes,'current':null,'pages':null})
    }
})

// MiddleWare for the Home page Rendering
app.use('/',LoggedInOrNotHeader)

// Home Page Path
app.get('/',(req,res)=>{
    const name = req.user.name
    res.render('index1',{welcomeMsg:"Welcome "+name})
    console.log("Showing Home Page")
})




// Listining to http://localhost:5005
app.listen(5005,()=>{
    console.log("server-started")
})