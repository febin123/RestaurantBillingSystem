const mongoose = require('mongoose');

const userchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
    {timestamps:true}
    );

    const userModel=mongoose.model("users",itemSchema)

    module.exports=userModel;