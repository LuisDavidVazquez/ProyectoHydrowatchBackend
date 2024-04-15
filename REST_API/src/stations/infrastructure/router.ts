import { Router } from "express";
import {
  createController,
  getByPkController,
  listController,
} from "./dependencies";

const stationRoutes = Router();

stationRoutes.post("/", createController.run.bind(createController));
stationRoutes.get("/", listController.run.bind(listController));
stationRoutes.get("/:id", getByPkController.run.bind(getByPkController));

export default stationRoutes;
