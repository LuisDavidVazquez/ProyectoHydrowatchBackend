import { Router } from "express";
import { accessController } from "./dependencies";

const userRoutes = Router();

userRoutes.post("/access", accessController.run.bind(accessController));

export default userRoutes;
