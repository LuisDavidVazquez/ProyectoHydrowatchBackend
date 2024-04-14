import { CreateStationUseCase } from "../application/CreateStationUseCase";
import { CreateStationController } from "./controllers/CreateStationController";
import { MongodbRepository } from "./repositories/MongodbRepository";

const mongodbRepository = new MongodbRepository()

//Create station
const createStationUseCase = new CreateStationUseCase (
    mongodbRepository
)
export const createStationController = new CreateStationController(
    createStationUseCase
)