import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_URL}/${process.env.DB_NAME}`
      );
      console.log("Database connection success: ")
  } catch (error) {
    console.log("Error while connection mongodb ", error);
  }
};
export default connectDb;
