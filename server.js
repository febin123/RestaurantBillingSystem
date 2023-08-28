const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotanv = require("dotenv");
require("colors");
const connectDB=require("./config/config")

//dotenv config
dotanv.config();

//db config
connectDB();

//rest object
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

const userRoute=require('./routes/userRoutes')

app.use('/api/users/',userRoute)

//Heroku 
const path=require('path')
if(process.env.NODE_ENV==='production'){
  app.use('/',express.static('restbilling/build'))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'restbilling/build/index.html'))
  })
}

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});

const billsRoute=require('./routes/billsRoutes')
app.use('/api/bills/',billsRoute)



