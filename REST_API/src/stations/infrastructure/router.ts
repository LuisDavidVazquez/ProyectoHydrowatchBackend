import { Router } from "express";
import {
  createController,
  getByPkController,
  listController,
  updateController,
} from "./dependencies";

const stationRoutes = Router();

stationRoutes.get("/", listController.run.bind(listController));
stationRoutes.get("/:id", getByPkController.run.bind(getByPkController));

stationRoutes.post("/", createController.run.bind(createController));

stationRoutes.put("/:id", updateController.run.bind(updateController));

export default stationRoutes;
