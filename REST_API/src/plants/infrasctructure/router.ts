import { Router } from "express";
import { createController } from "./dependencies";

const plantsRoutes = Router();

//plantsRoutes.get("/",(req,res)=>{res.send("Hola desde plantas")})
plantsRoutes.post("/:station_id", createController.run.bind(createController));

export default plantsRoutes;
