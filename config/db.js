const mongoose= require('mongoose');

const connectDB= async () =>{
    try {
        const  connection= await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log(`MongoDB Connected: ${connection.connection.host} `.cyan.bold)
    }catch (error){
        console.log(error .red.bold);
        process.exit();
    }
}
module.exports=connectDB;