let express=require("express")
const multer  = require('multer')
const { insert, view, editRow } = require("../../../Controller/admin/ProductController")



let productRoutes=express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/products')
    },
    filename: function (req, file, cb) {
      const uniqueFileName=(new Date().getTime())
      cb(null, uniqueFileName+file.originalname)
    }
  })
  

  const upload = multer({storage: storage}).fields([
    {name:'img1', maxCount:1},
    {name:'img2', maxCount:1}
  ]);

  productRoutes.post('/insert/:id?',upload,insert)
  productRoutes.get('/view',view)
  productRoutes.get('/edit/:id',editRow)

  module.exports=productRoutes