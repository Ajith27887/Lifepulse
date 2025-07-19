import { mongoose } from "mongoose";
import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URL;

const connectdb = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log(`Database connected: ${mongoose.connection.name}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectdb;