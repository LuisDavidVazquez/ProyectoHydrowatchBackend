import CreateUseCase from "../application/CreateUseCase";
import DeleteUseCase from "../application/DeleteUseCase";
import GetByPkUseCase from "../application/GetByPkUseCase";
import ListUseCase from "../application/ListUseCase";
import UpdateUseCase from "../application/UpdateUseCase";
import CreateController from "./controllers/CreateController";
import DeleteController from "./controllers/DeleteController";
import GetByPkController from "./controllers/GetByPkController";
import ListController from "./controllers/ListController";
import UpdateController from "./controllers/UpdateController";
import Auth from "./middlewares/Auth";
import PlantModel from "./models/PlantModel";
import StationModel from "./models/StationModel";
import { SqlPlantRespository } from "./repositories/SqlPlantRepository";
import TokenService from "./services/TokenService";
import UUIDService from "./services/UUIDService";

export const sqlPlantRepository = new SqlPlantRespository(
  PlantModel,
  StationModel
);

export const uuidService = new UUIDService();
export const tokenService = new TokenService()

export const createUseCase = new CreateUseCase(sqlPlantRepository, uuidService);
export const listUseCase = new ListUseCase(sqlPlantRepository);
export const getByPkUseCase = new GetByPkUseCase(sqlPlantRepository);
export const deleteUseCase = new DeleteUseCase(sqlPlantRepository);
export const updateUseCase = new UpdateUseCase(sqlPlantRepository)

export const createController = new CreateController(createUseCase);
export const listController = new ListController(listUseCase);
export const getByPkController = new GetByPkController(getByPkUseCase);
export const deleteController = new DeleteController(deleteUseCase);
export const updateController = new UpdateController(updateUseCase)
export const authMiddleware = new Auth(tokenService)