let express=require("express")
let app=express()
const cors = require("cors");
const mongoose=require("mongoose");
var passwordHash = require('password-hash');
const routes = require("./API/router");
const loginModel = require("./API/Model/AdminLoginModal");
app.use(cors())
app.use(express.json());
app.use(routes)

app.post('/',async (req,res)=>{
    try{
        const existingAdmin = await loginModel.findOne({ loginId: "admin" })
       if(existingAdmin){
            console.log("data alreay exist")
       }else{
            let login= loginModel({
                loginId:"admin",
                loginPass:passwordHash.generate("admin"),
                status:true 
            })
            let loginSave=await login.save();
            
            res.send(loginSave);
       }
    }catch(error){
        console.error(error);
       
    }
 
})
app.use('/uploads/category', express.static('uploads/category'))
app.use('/uploads/products', express.static('uploads/products'))
mongoose.connect('mongodb://127.0.0.1:27017/ecomproject')

.then(() => {
    app.listen("8000")
});
