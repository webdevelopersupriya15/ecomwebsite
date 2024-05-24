const mongoose = require('mongoose');

const productModel = require('../../Model/ProductModel');

exports.insert= async(req,res)=>{
    if(req.params.id===undefined){
        let product=productModel({
            categoryId:req.body.catId,
            productName:req.body.pName,
            productPrice:req.body.pPrice,
            productDesc:req.body.pDesc,
            productImg1:req.files[0].filename,
            productImg2:req.files[1].filename,
            productStatus:req.body.status==1 ? true : false
        })

        let productSave=await product.save();
        console.log(productSave)
        res.send(productSave);
    }else{
        let product
        let id=req.params.id;
        if(req.files===undefined){
            product= await productModel.updateOne({_id:id},{
                categoryId:req.body.catId,
                productName:req.body.pName,
                productPrice:req.body.pPrice,
                productDesc:req.body.pDesc,
                productStatus:req.body.status==1 ? true : false
            })
        }else{
            
            product= await productModel.updateOne({_id:id},{
                categoryId:req.body.catId,
                productName:req.body.pName,
                productPrice:req.body.pPrice,
                productDesc:req.body.pDesc,
                productImg1:req.files[0].filename,
                productImg2:req.files[1].filename,
                productStatus:req.body.status==1 ? true : false
            })
            console.log( product)

        }
       
        res.send(product)
    }
}

exports.view=async (req,res)=>{
    let  product=await productModel.find().populate('categoryId')
    res.send(product)
}

exports.editRow=async (req,res)=>{
    let product=await productModel.findOne({_id:req.params.id})
    res.send(product);
}

// exports.deleteCategory=async (req,res)=>{
    
//     let delRes= await categoryModel.deleteOne({_id:req.params.id})
//     res.send(delRes)
// }