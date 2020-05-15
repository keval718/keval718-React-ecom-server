const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
let productList = require("../models/ProductM");
const router = express.Router();

router.post('/addProducts',[

    check('name','name is required').not().isEmpty(),
    check('price','price should be required').not().isEmpty(),
    check('description','description is required').not().isEmpty(),
    check('image','image is required').not().isEmpty()
],
async(req,res)=>{

    try{
        const error=validationResult(req);
        if(!error.isEmpty())
        {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        else
        {
            console.log(req.body);
            const newProduct=new productList({
                name:req.body.name,
                price:req.body.price,
                description:req.body.description,
                image:req.body.image

                
            })
           await  newProduct.save();
        }

    }
    catch(err)
    {
        res.send(err);
    }
}

);
router.get('/',async(req,res)=>{
    try{

        const product= await productList.find();
        res.send(product);

    }
    catch(err)
    {
        res.send(err);
    }

});
router.delete('/:id',async(req,res)=>{
    try{
          const pid=await productList.findById(req.params.id);
          pid.delete();
          res.json("product deleted");
    }
    catch(err)
    {
        res.send(err);
    }
});

router.put('/:id',async(req,res)=>{
    try{
    let pid=await productList.findById(req.params.id);
    console.log(pid);
    pid.name=req.body.name;
    pid.price=req.body.price;
    pid.description=req.body.description;
    pid.image=req.body.image;
    const product=await pid.save();
    res.send(product);
    }
    catch(err)
    {
        res.send(err);
    }

})
module.exports=router;