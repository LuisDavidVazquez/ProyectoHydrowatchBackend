import express from 'express'
import dotenv from 'dotenv'
import { userRouter } from './user/infrastructure/UserRoutes'
import { stationRouter } from './stations/infrastructure/StationRoutes';

const cors = require('cors');
dotenv.config()

const port = process.env.SERVER_PORT

const app = express()

app.use(cors());
app.use(express.json())
app.use("/users", userRouter)
app.use("/stations", stationRouter)

app.listen(port, () => {
    console.log("Server running in port ", port)
})