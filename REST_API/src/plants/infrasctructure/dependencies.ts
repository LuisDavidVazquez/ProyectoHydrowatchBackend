import CreateUseCase from "../application/CreateUseCase";
import GetByPkUseCase from "../application/GetByPkUseCase";
import ListUseCase from "../application/ListUseCase";
import CreateController from "./controllers/CreateController";
import GetByPkController from "./controllers/GetByPkController";
import ListController from "./controllers/ListController";
import PlantModel from "./models/PlantModel";
import StationModel from "./models/StationModel";
import { SqlPlantRespository } from "./repositories/SqlPlantRepository";
import UUIDService from "./services/UUIDService";

export const sqlPlantRepository = new SqlPlantRespository(
  PlantModel,
  StationModel
);

export const uuidService = new UUIDService();

export const createUseCase = new CreateUseCase(sqlPlantRepository, uuidService);
export const listUseCase = new ListUseCase(sqlPlantRepository);
export const getByPkUseCase = new GetByPkUseCase(sqlPlantRepository);

export const createController = new CreateController(createUseCase);
export const listController = new ListController(listUseCase);
export const getByPkController = new GetByPkController(getByPkUseCase);