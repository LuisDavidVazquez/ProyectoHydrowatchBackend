import { Router } from "express";

const plantsRoutes = Router();

plantsRoutes.get("/",(req,res)=>{res.send("Hola desde plantas")})

export default plantsRoutes;
