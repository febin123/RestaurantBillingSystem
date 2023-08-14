const express= require('express');
const { getItemController,addItemController,editItemController, deleteItemController } = require('../controllers/itemController');

const router=express.Router();

//routes


//Method for login the user
router.post('/login',async(req,res)=>{
    try{
        const newitem=new ItemModel(req.body)
        await newitem.save()
        res.send("User Logged In")
    }catch(error){
        res.status(400).json(error)
    }
});

//Method for register the user
router.post('/register',async(req,res)=>{
    try{
        const newitem=new ItemModel(req.body)
        await newitem.save()
        res.send("User Logged In")
    }catch(error){
        res.status(400).json(error)
    }
});


module.exports=router;
    
