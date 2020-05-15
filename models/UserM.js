const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    province:{
        type:String,
        required:true
    },
    postalcode:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }

});
const User=mongoose.model('user',UserSchema);
module.exports=User;