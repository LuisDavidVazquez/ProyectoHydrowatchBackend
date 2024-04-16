import { Router } from "express";
import {
  accessController,
  authController,
  getByPkController,
  listController,
} from "./dependencies";

const userRoutes = Router();

userRoutes.post("/access", accessController.run.bind(accessController));
userRoutes.post("/auth/:token", authController.run.bind(authController));

userRoutes.get("/", listController.run.bind(listController));
userRoutes.get("/:id", getByPkController.run.bind(getByPkController));

export default userRoutes;
