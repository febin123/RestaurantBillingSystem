const express= require('express');
const { getItemController,addItemController } = require('../controllers/itemController');

const router=express.Router();

//routes

//Method-get
router.get('/get-item',getItemController);

//Method-post
router.post('/add-item',addItemController);
module.exports=router;
<<<<<<< HEAD
    
=======
 
>>>>>>> 6f3f383bdb2688f5fff2843a6c00f34ba8ca71d6
