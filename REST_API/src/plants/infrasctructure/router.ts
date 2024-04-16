import { Router } from "express";
import {
  createController,
  getByPkController,
  listController,
} from "./dependencies";

const plantsRoutes = Router();

plantsRoutes.get("/station/:station_id", listController.run.bind(listController));
plantsRoutes.get("/:id", getByPkController.run.bind(getByPkController));

plantsRoutes.post("/:station_id", createController.run.bind(createController));

export default plantsRoutes;
