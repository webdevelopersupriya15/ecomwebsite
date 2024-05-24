let express=require("express")
const { login } = require("../../../Controller/admin/LoginController")
let loginRoutes=express.Router()

loginRoutes.post('/login',login)
module.exports=loginRoutes