import { Router } from "express";
import {
  authMiddleware,
  createController,
  deleteController,
  getByPkController,
  listController,
  updateController,
} from "./dependencies";

const plantsRoutes = Router();

plantsRoutes.get(
  "/station/:station_id",
  authMiddleware.run.bind(authMiddleware),
  listController.run.bind(listController)
);
plantsRoutes.get(
  "/:id",
  authMiddleware.run.bind(authMiddleware),
  getByPkController.run.bind(getByPkController)
);

plantsRoutes.post(
  "/:station_id",
  authMiddleware.run.bind(authMiddleware),
  createController.run.bind(createController)
);

plantsRoutes.delete(
  "/:id",
  authMiddleware.run.bind(authMiddleware),
  deleteController.run.bind(deleteController)
);

plantsRoutes.put(
  "/:id",
  authMiddleware.run.bind(authMiddleware),
  updateController.run.bind(updateController)
);

export default plantsRoutes;
