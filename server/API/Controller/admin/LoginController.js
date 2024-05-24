const mongoose = require('mongoose');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
const loginModel = require('../../Model/AdminLoginModal');
let tokenKey='ecomproject@123!'
exports.login=async (req,res)=>{

    let resApi
    let user

    user=await loginModel.findOne({loginId:req.body.logId})
    if(user!==null){ 
        let reqPass=req.body.pass
        let userPass=user.loginPass
        if(passwordHash.verify(reqPass, userPass)){
            resApi=user
            var token = jwt.sign({ userId: user._id }, tokenKey);
            resApi={
                userId:user.loginId,
                token:token
            }
        }
        else{
            resApi={
                'status':0,
                'message':"Password Not Matched"
            }
        }
        
    }else{
        resApi={
            'status':0,
            'message':"Email Id Not Matched"
        }
    }

    res.send(resApi)
    console.log(resApi)

}