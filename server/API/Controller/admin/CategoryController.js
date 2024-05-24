const mongoose = require('mongoose');
const categoryModel = require('../../Model/CategoryModal');

exports.insert= async(req,res)=>{
    
    if(req.params.id===undefined){
        let category=categoryModel({
            catName:req.body.cname,
            catDesc:req.body.cdesc,
            catImage:req.file.filename,
            catStatus:req.body.status==1 ? true : false
        })

        let categorySave=await category.save();
        console.log(categorySave)
        res.send(categorySave);
  }else{
    
    let category
    let id=req.params.id;
    if(req.file===undefined){
        category= await categoryModel.updateOne({_id:id},{
            catName:req.body.cname,
            catDesc:req.body.cdesc,
            catStatus:req.body.status==1 ? true : false
        })
    }else{
        category= await categoryModel.updateOne({_id:id},{
            catName:req.body.cname,
            catDesc:req.body.cdesc,
            catImage:req.file.filename,
            catStatus:req.body.status==1 ? true : false
        })

    }
    res.send(category)

  }
}

exports.view=async (req,res)=>{
    let category=await categoryModel.find()
    res.send(category)
}

exports.editRow=async (req,res)=>{
    let category=await categoryModel.findOne({_id:req.params.id})
    res.send(category);
}

// exports.deleteCategory=async (req,res)=>{
    
//     let delRes= await categoryModel.deleteOne({_id:req.params.id})
//     res.send(delRes)
// }