const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    loginId:String,
    loginPass:String,
    status:Boolean
}, {timestamps: true});

const loginModel = mongoose.model('login', loginSchema);

module.exports=loginModel;