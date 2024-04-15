import { Router } from "express";
import { createController, listController } from "./dependencies";

const stationRoutes = Router();

stationRoutes.post("/", createController.run.bind(createController));
stationRoutes.get("/", listController.run.bind(listController));

export default stationRoutes;
