const mongoose = require('mongoose')

//Initialinzing Connection to Cooking-Journal In MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Cooking-Journal')
.then(()=>{console.log("Connected to Recipe Collection")})
.catch((err)=>{console.log("Unexpected Error occoured "+err)})

// Below Command will not pluaralize the Collection Name 
mongoose.pluralize(null)

//Creating a Schema name Recipe in variable named recipe
const recipe = new mongoose.Schema({
    //Recipe Tite
    title: {
        type: String,
        required: true,
        trim: true
      },
      //Short Description about recipe
      description: {
        type: String,
        trim: true
      },
      //Type Of Recipe 
      cuisineType: {
        type: String,
        trim: true,
        required: true
      },
      //How many people can have a meal at a time
      servingSize: {
        type: Number,
        required: true
      },
      //Step By step Instructions for Recipe 
      instructions: {
        type:String,
        required:true
      },
      //Specific File Path for Image
      images: {
        type: String
      },
      //If have any video URL Then 
      videoUrl: {
        type: String,
        trim: true
      },
      //Date of Uploading recipe
      dateCreated: {
        type: Date,
        default: new Date()
      },
      createdBy:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
});

// Creating a model for Database and Storing it in Recipe Variable
const Recipe = new mongoose.model("Recipe",recipe);

//Exporting the Model Instance
module.exports = Recipe;