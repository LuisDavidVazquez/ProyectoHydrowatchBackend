import { connect } from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const DB_URI = `${process.env.MONGODB_URI}`;

const connectionMongodb = async () => {
  await connect(DB_URI);
  console.log("MongoDB connected");
};

export default connectionMongodb;