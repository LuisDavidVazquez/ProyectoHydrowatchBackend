import CreateUseCase from "../application/CreateUseCase";
import CreateController from "./controllers/CreateController";
import PlantModel from "./models/PlantModel";
import StationModel from "./models/StationModel";
import { SqlPlantRespository } from "./repositories/SqlPlantRepository";
import UUIDService from "./services/UUIDService";

export const sqlPlantRepository = new SqlPlantRespository(PlantModel, StationModel);

export const uuidService = new UUIDService();

export const createUseCase = new CreateUseCase(sqlPlantRepository, uuidService);

export const createController = new CreateController(createUseCase);
