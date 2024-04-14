import express  from "express"; 
import { createStationController } from "./StationDependencies";

export const stationRouter = express.Router()

stationRouter.post("/",createStationController.run.bind(createStationController))