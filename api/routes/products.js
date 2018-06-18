const express = require('express');
const ProductModel = require('../model/productModel');
const mongoose = require('mongoose');
const router =express.Router();
const multer = require('multer');

const storageStrategy = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./images/');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+file.originalname);
    }
});

const mkd = multer({dest:"images/"});
const upload = multer({storage:storageStrategy});


router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"handling GET request to /products"
    });
})

router.post('/',upload.single('productImage'),(req,res,next)=>{
   const product = new ProductModel({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
   });
   product.save().then(result => {
       console.log(result);
       res.status(200).json({
           message:"data saved",
           status:true,
           data: result
       });
   })
   .catch(err =>{
       res.status(404).json({
           message:err,
           status:false
       });
   })
})

router.get('/:id',(req,res,next)=>{
    const id=req.params.id;
    ProductModel.findById({"_id":id})
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(201).json({
            message:doc
        })
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            message:err
        });
    });
});
router.get('/delete/:id',(req,res,next)=>{
    const deleteid=req.params.id;
    ProductModel.findOne({"_id":deleteid})
    .exec()
    .then(data =>{
        if(data){
            ProductModel.findByIdAndRemove({"_id":deleteid})
            .exec()
            .then(doc => {
                console.log("Data Deleted");
                res.status(201).json({
                    message:"data of id: "+deleteid+" has been deleted",
                    status : true
                });
            })
            .catch(err =>{
                console.log("error",err);
                res.status(404).json({
                    message:err.message,
                    status: false
                });
            })
        }
    })
    .catch(err =>{
        res.status(404).json({
            message: "User Id Not Found",err
        });
    })
})
router.post('/update',upload.single('productImage'),(req,res,next)=>{
    const updateid = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const productImage= req.file.path;
    console.log(updateid,name,price,productImage, "this data");
    ProductModel.findOne({"_id":updateid})
    .then(data =>{
        if(!data)
        {
            console.log("Not a valid id");
            res.status(400).json({
                message:"user id is not valid",
                status: false
            });
        }
        else
        {
            ProductModel.findByIdAndUpdate({"_id":updateid},{"name":name,"price":price,"productImage":productImage},{new:true})
            .exec()
            .then(data =>{
                res.json({
                    message: data,
                    status: true,
                    data: data
                })
            })
            .catch(err=>{
                res.json({
                    message: err.message,
                    status: false
                })
            })
        }
    })
})
router.get('/show/all',(req,res,next)=>{
    ProductModel.find({})
    .exec()
    .then(data=>{
        res.json({
            alldata: data
        }).status(201)
    })
    .catch(err =>{
        res.json({
            message: err.message
        }).status(404)
    })
})


module.exports=router;