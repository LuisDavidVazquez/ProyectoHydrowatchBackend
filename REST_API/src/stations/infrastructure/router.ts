import { Router } from "express";
import { createController } from "./dependencies";

const stationRoutes = Router();

stationRoutes.post("/", createController.run.bind(createController));

export default stationRoutes;
