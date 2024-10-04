import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Failed to connect");
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
