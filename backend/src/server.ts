import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./users/infrastructure/UserRoutes";
import { stationRouter } from "./stations/infrastructure/StationRoutes";
import cors from "cors";

dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/stations", stationRouter);

app.listen(port, () => {
  console.log("HTTP REST API listening on http://127.0.0.1:" + port);
});
