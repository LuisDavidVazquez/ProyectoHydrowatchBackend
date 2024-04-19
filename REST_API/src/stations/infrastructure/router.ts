import { Router } from "express";
import {
  authMiddleware,
  createController,
  getByPkController,
  listController,
  updateController,
} from "./dependencies";

const stationRoutes = Router();

stationRoutes.get(
  "/",
  authMiddleware.run.bind(authMiddleware),
  listController.run.bind(listController)
);
stationRoutes.get(
  "/:id",
  authMiddleware.run.bind(authMiddleware),
  getByPkController.run.bind(getByPkController)
);

stationRoutes.post("/", createController.run.bind(createController));

stationRoutes.put(
  "/:id",
  authMiddleware.run.bind(authMiddleware),
  updateController.run.bind(updateController)
);

export default stationRoutes;
