import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => res.send("Hola desde user"));

export default userRoutes;
