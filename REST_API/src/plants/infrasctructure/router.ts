import { Router } from "express";
import { createController, listController } from "./dependencies";

const plantsRoutes = Router();

plantsRoutes.get("/:station_id", listController.run.bind(listController));
plantsRoutes.post("/:station_id", createController.run.bind(createController));

export default plantsRoutes;
