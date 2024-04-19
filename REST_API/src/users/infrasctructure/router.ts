import { Router } from "express";
import {
  accessController,
  authController,
  authMiddleware,
  getByPkController,
  listController,
  updateController,
} from "./dependencies";

const userRoutes = Router();

userRoutes.post("/access", accessController.run.bind(accessController));
userRoutes.post("/auth/:token", authController.run.bind(authController));

userRoutes.get("/", listController.run.bind(listController));
userRoutes.get(
  "/:id",
  authMiddleware.run.bind(authMiddleware),
  getByPkController.run.bind(getByPkController)
);

userRoutes.put("/:id",authMiddleware.run.bind(authMiddleware), updateController.run.bind(updateController));

export default userRoutes;
