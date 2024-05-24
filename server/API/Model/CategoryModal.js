const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    catName:String,
    catDesc:String,
    catImage:String,
    catStatus:Boolean

}, {timestamps: true});

const categoryModel = mongoose.model('categories', categorySchema);

module.exports=categoryModel