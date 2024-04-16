import { Router } from "express";
import {
  createController,
  deleteController,
  getByPkController,
  listController,
  updateController,
} from "./dependencies";

const plantsRoutes = Router();

plantsRoutes.get(
  "/station/:station_id",
  listController.run.bind(listController)
);
plantsRoutes.get("/:id", getByPkController.run.bind(getByPkController));

plantsRoutes.post("/:station_id", createController.run.bind(createController));

plantsRoutes.delete("/:id", deleteController.run.bind(deleteController));

plantsRoutes.put("/:id", updateController.run.bind(updateController));

export default plantsRoutes;
