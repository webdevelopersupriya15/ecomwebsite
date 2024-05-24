let express=require("express")
const categoryRoutes = require("./Routes/admin/category/categoryRoutes")
const loginRoutes = require("./Routes/admin/login/loginRoutes")
const productRoutes = require("./Routes/admin/products/productRoutes")
let routes=express.Router()


routes.use("/category",categoryRoutes)
// routes.use("/view",categoryRoutes)
routes.use("/product",productRoutes)
routes.use("/admin",loginRoutes)

module.exports=routes 