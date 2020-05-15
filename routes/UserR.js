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
            console.log("inside ");
            console.log(req.body);
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
                 users:{
                     id:newUser._id,
                     name:newUser.name
                 }
             };
             //jwt is used to generate the token
             jwt.sign(
                 payload,
                 config.get('jwtsecret'),{
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

router.get('/',
async(req,res)=>{
    try
    {
    let user= await userList.find();
    res.send(user);
    }
    catch(err)
    {
        res.send(err);
    }

}
);

router.post('/login',async(req,res)=>{

    try{
        console.log("inside");
        let user= await userList.findOne({
            email:req.body.email
        });
    console.log(user+"inside");
    if(!user)
    {
       res.send("User not found ");
    }
   
        const validpassword= await bcrypt.compare(req.body.password,user.password);
        console.log(validpassword);
        const payload = {
            user: {
                id: user.id,
                name: user.name
    
            }
        }
        if(!validpassword)
        {
            res.send("invalid");
        }
        else
        {
            jwt.sign(
                payload,
                config.get('jwtsecret'), {
                    expiresIn: 36000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    });
                }
            );
    
        }
    
            

    


}
catch(err)
{
    res.send(err);
}
});
module.exports = router;