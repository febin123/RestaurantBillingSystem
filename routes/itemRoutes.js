const express= require('express');
const { getItemController,addItemController,editItemController } = require('../controllers/itemController');

const router=express.Router();

//routes

//Method-food item
router.get('/get-item',getItemController);

//Method-food item
router.post('/add-item',addItemController);

//edit food item
router.post('/edit-item', editItemController);
module.exports=router;
    
