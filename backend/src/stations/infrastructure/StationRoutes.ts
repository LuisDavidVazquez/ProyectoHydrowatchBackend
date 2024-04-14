import express  from "express"; 
import { createStationController, getStationByIdController, getStationsController } from "./StationDependencies";

export const stationRouter = express.Router()

stationRouter.post("/",createStationController.run.bind(createStationController))
stationRouter.get("/",getStationsController.run.bind(getStationsController))
stationRouter.get("/:id",getStationByIdController.run.bind(getStationByIdController))