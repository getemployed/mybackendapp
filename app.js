const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app=express();
const config = require('./config/config');
var uri=config.database.connectionString;
mongoose.connect(uri,function(err){
    if(err){
        console.log(err.message);
    }
    else{
        console.log("MongoDB is at your service");
    }
})

app.use("/images",express.static('images'));
app.use(bodyParser.json()); //fetching data from json
app.use(bodyParser.urlencoded({extended:false})); //fetching dat from url


const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');
const emailRoutes=require('./api/routes/email');


app.use(cors());
//Routes that should handle requests
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/sendmail',emailRoutes);

app.use((req,res,next)=>{
    const error = new Error(" URL not found");
    error.status=404;
    next(error);
});
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});
module.exports=app;