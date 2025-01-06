const mongoose = require('mongoose')
const validator = require('validator')

// Connecting to Cooking-Journal
mongoose.connect("mongodb://127.0.0.1:27017/Cooking-Journal")
.then(()=>{console.log("Connected to Cooking-Jornal for model User")})
.catch((err)=>{console.log("Unexpected error occoured"+ err)})

mongoose.pluralize(null)

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        validate:{
            validator:(v)=>{return validator.isEmail(v);},
            message:'Email is invalid'
        },
        unique:true,
    },
    profession:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:[8,'Password must be atleast 8 character']
    },
    date:{
        type:Date,
        default:new Date()
    },
    sessionId:{
        type:String,
        default:'null',
    }
});

const User = new mongoose.model('User',user);

module.exports = User;