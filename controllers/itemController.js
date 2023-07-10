const itemModel=require('../models/itemModel')

export const getItemController =async(req,res)=>{
    try{
        const items=await itemModel.find()
        res.status(200).send(items)
    }catch(error){
        console.error(error)
    }
}