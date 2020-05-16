const mongoose=require('mongoose');
const sub=new Schema({
    name:{type:String},
    price:{type:String},
    quantity:{type:Number},

})
const addtocart=new mongoose.Schema({
email:{
    type:String,
    required:true
},
products:[sub],
amount:{
    type:Number
}



});

const addToCart = mongoose.model('AddToCarts', addtocart);
module.exports = addToCart;