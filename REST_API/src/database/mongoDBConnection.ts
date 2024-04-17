import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URLMONGO = process.env["MONGO_URI"] ?? "mongodb://user:pass@127.0.0.1/";
const DATABASE = process.env["MONGO_DATABASE"] ?? "test";

const mongoDBConnection = async () => {
  await connect(URLMONGO, { dbName: DATABASE });
  console.log("MongoDB connected");
};

export default mongoDBConnection;