import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import stationRoutes from "./stations/infrastructure/router";

console.clear();
console.log("Iniciando aplicación...");

dotenv.config();

const APP_PORT = process.env["APP_PORT"] ?? 3030;

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["*"],
  })
);

app.use(express.json({ limit: "100mb" }));

app.use("/stations", stationRoutes);

app.listen(APP_PORT, () => {
  console.info(`Servidor listo y escuchando en: http://127.0.0.1:${APP_PORT}/`);
});
