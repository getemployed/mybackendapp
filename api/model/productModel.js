const mongoose = require('mongoose');
//create schema
const productModel = mongoose.Schema({
    name: String,
    price:Number,
    productImage:String
});

module.exports=mongoose.model("Product",productModel);
