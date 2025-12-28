import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // 🔥 THIS LINE WAS MISSING

export default async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
}
