const express=require('express')
const BillModel=require('../models/billModel')
const router=express.Router()

router.post("/charge-bill",async(req,res)=>{
    try{
        const newBill=new BillModel(req.body)
        await newBill.save()
        res.send("Bill Charge Successfully")
    }catch(error){
        res.status(400).json(error)
    }
})
//get reauest to get all bills
router.get("/get-all-bills",async(req,res)=>{
    try{
        const bills=await BillModel.find()
        res.send(bills)
    }catch(error){
        res.status(400).json(error)
    }
})

module.exports=router