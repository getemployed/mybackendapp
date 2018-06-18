var express = require('express');
var router =express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"order get method"
    });
});

router.post('/',(req,res,next)=>{
    const orders={
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        message:"post method handled",
        gotOrders: orders
    });

});

module.exports=router;
