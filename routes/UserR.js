const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
let userList = require("../models/UserM");
const router = express.Router();
router.post('/addUser',[
    check('password','password is required').not().isEmpty(),
    check('name','Minimum 1 caracter is needed'),
    check('country','country is required').not().isEmpty(),
    check('email','email is required').not().isEmpty(),
    check('postalcode','postal code is required').not().isEmpty(),
    check('province','province is required').not().isEmpty(),
    check('phone','phone number is required').not().isEmpty()


],
async(req,res)=>{
    try{

        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        else
        {
            console.body(req.body);
            try{
            let user= await userList.findOne({
                email:req.body.email
            });
            if(user)
            {
                return res.send("user already exist");
            }
            else
            {
             const newUser=new userList({
                 name:req.body.name,
                 email:req.body.email,
                 password:req.body.password,
                 country:req.body.country,
                 province:req.body.province,
                 postalcode:req.body.postalcode,
                 phone:req.body.phone
                
             })
             //hash the password
             const salt=await bcrypt.genSalt(10);
             newUser.password=await bcrypt.hash(req.body.password,salt);
             await newUser.save();

             //after creating user we will generate token
             //payload is used for how you want to look you token so here it will contain user _id and user email
             const payload={
                 user:{
                     id:newUser._id,
                     name:newUser.name
                 }
             };
             //jwt is used to generate the token
             jwt.sign(
                 payload,
                 congig.get('jwtsecret'),{
                    expiresIn: 360000
                 },
                 (err,token)=>{
                     if(err) throw err;
                     res.json({
                         token
                     });
                 }
             );
            }
        }
            catch(err){
              res.send(err);
            }
        
        
        }


    }
    catch(err)
    {
        res.send(err);
    }

});