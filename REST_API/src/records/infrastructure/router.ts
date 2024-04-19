import { Router } from "express";
import {
  authMiddleware,
  getByPkController,
  listController,
} from "./dependencies";

const recordRoutes = Router();

recordRoutes.get(
  "/station/:id",
  authMiddleware.run.bind(authMiddleware),
  listController.run.bind(listController)
);
recordRoutes.get(
  "/:id",
  authMiddleware.run.bind(authMiddleware),
  getByPkController.run.bind(getByPkController)
);

export default recordRoutes;
