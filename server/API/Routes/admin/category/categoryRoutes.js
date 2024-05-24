let express=require("express")
const multer  = require('multer')
const { insert, view, deleteCategory, editRow } = require("../../../Controller/admin/CategoryController")


let categoryRoutes=express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/category')
    },
    filename: function (req, file, cb) {
      const uniqueFileName=(new Date().getTime())
      cb(null, uniqueFileName+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  categoryRoutes.post('/insert/:id?',upload.single('categoryImage'),insert)
  //categoryRoutes.get('/delete/:id',deleteCategory)
  categoryRoutes.get('/view',view)
  categoryRoutes.get('/edit/:id',editRow)

  module.exports=categoryRoutes