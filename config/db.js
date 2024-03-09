import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

export default connectDb;
