import { Router } from "express";
import { getByPkController, listController } from "./dependencies";

const recordRoutes = Router();

recordRoutes.get("/station/:id", listController.run.bind(listController));
recordRoutes.get("/:id", getByPkController.run.bind(getByPkController));

export default recordRoutes;
