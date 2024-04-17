import { Router } from "express";
import { listController } from "./dependencies";

const recordRoutes = Router();

recordRoutes.get("/station/:id", listController.run.bind(listController));

export default recordRoutes;
