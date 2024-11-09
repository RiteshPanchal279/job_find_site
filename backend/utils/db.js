import mongoose from "mongoose";

const connectDB = async ()=>{
   const url = process.env.MONGO_URL;
   try {
      await mongoose.connect(url);
      
      console.log('mongoDB connected successfuly');
      
   } catch (err) {
      console.log('mongodb connection error',err);
   }
}


export default connectDB;