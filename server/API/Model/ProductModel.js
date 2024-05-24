const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const productSchema = mongoose.Schema({
    categoryId:[
        {
            type: Schema.Types.ObjectId,
            ref: 'categories'
         }
    ],
    productName:String,
    productPrice:Number,
    productDesc:String,
    productImg1:String,
    productImg2:String,
    productStatus:Boolean
}, {timestamps: true}); 

const productModel = mongoose.model('products', productSchema);

module.exports=productModel