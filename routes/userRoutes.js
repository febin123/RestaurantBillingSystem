const express= require('express');
const UserModel=require('../models/userModel')
const { getItemController,addItemController,editItemController, deleteItemController } = require('../controllers/itemController');

const router=express.Router();

//routes


//Method for login the user
router.post('/login',async(req,res)=>{
    try{
        await UserModel.findOne({userId:req.body.userId,password:req.body.password,verified:true})   
        res.send("Login Successfull")
    }catch(error){
        res.status(400).json(error)
    }
});

//Method for register the user
router.post('/register',async(req,res)=>{
    try{
        const newuser=new UserModel({})
        await newuser.save()
        res.send("User Registered Successfully")
    }catch(error){
        res.status(400).json(error)
    }
});


module.exports=router;
    
