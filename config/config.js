const mongoose=require('mongoose');

require('colors')

//connectDB function
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected ${conn.connection.host}`.bgYellow)

    }catch(error){
        console.log(`Error: ${error.message}`.bgRed)
        process.exit(1)
    }
}

//export
module.exports =connectDB;