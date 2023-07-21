<<<<<<< HEAD
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotanv = require("dotenv");
require("colors");
const connectDB=require("./config/config")

//dotenv config
dotanv.config();
=======
const express=require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors=require('cors')
const dotenv = require('dotenv')
require('colors')
const connectDB=require('./config/config')


//dotenv config
dotenv.config()
>>>>>>> 6f3f383bdb2688f5fff2843a6c00f34ba8ca71d6

//db config
connectDB();

//rest object
<<<<<<< HEAD
const app = express();

//middlwares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.use("/api/items", require("./routes/itemRoutes"));

app.get("/",(req,res)=>{
    res.send("<h1>BACKEND</h1>")
})
//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});
=======
const app=express()

//middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(morgan("dev"))

//routes
app.use('/api/items',require('./routes/itemRoutes'))

//port
const PORT=process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`.bgCyan.white)
})
>>>>>>> 6f3f383bdb2688f5fff2843a6c00f34ba8ca71d6
