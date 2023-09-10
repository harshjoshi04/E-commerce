import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connection = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_URL);
    if (con) {
      console.log("Connection Successfully");
    }
  } catch (er) {
    console.log(er);
  }
};

export default connection;
