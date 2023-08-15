const express= require('express');
const UserModel=require('../models/userModel')
const { getItemController,addItemController,editItemController, deleteItemController } = require('../controllers/itemController');

const router=express.Router();

//routes


//Method for login the user
router.post('/login',async(req,res)=>{
    try{
        const user=await UserModel.findOne({userId:req.body.userId,password:req.body.password,verified:true})
        if(user)   
            res.send(user)
            else
            res.status(400).json(error)  
    }catch(error){
        res.status(400).json(error)
    }
});

//Method for register the user
router.post('/register',async(req,res)=>{
    try{
        const newuser=new UserModel({...req.body,verified:false})
        await newuser.save()
        res.send("User Registered Successfully")
    }catch(error){
        res.status(400).json(error)
    }
});


module.exports=router;
    
