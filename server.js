const express=require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors=require('cors')
const dotanv = require('dotenv')
require('colors')
const connectDB=require('./config/config')


//dotenv config
dotanv.config()

//db config
connectDB();

//rest object
const app=express()

//middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(morgan("dev"))

//routes
app.get('/',(req,res)=>{
    res.send("<h1>Billing System BACKEND</h1>")
});

//port
const PORT=process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`.bgCyan.white)
})