import { CreateStationUseCase } from "../application/CreateStationUseCase";
import { GetStationByIdUseCase } from "../application/GetStationByIdUseCase";
import { GetStationsUseCase } from "../application/GetStationsUseCase";
import { CreateStationController } from "./controllers/CreateStationController";
import { GetStationByIdController } from "./controllers/GetStationByIdController";
import { GetStationsController } from "./controllers/GetStationsController";
import { MongodbRepository } from "./repositories/MongodbRepository";

const mongodbRepository = new MongodbRepository()

//Create station
const createStationUseCase = new CreateStationUseCase (
    mongodbRepository
)
export const createStationController = new CreateStationController(
    createStationUseCase
)

//Get Stations
const getStationsUseCase = new GetStationsUseCase(
    mongodbRepository
)
export const getStationsController = new GetStationsController(
    getStationsUseCase
)
//Get Stations By id
const getStationByIdUseCase = new GetStationByIdUseCase(
    mongodbRepository
)
export const getStationByIdController = new GetStationByIdController(
    getStationByIdUseCase
)