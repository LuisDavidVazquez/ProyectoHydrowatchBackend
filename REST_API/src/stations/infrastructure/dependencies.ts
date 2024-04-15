import CreateUseCase from "../application/CreateUseCase";
import ListUseCase from "../application/ListUseCase";
import CreateController from "./controllers/CreateController";
import ListController from "./controllers/ListController";
import StationModel from "./models/StationModel";
import UserModel from "./models/UserModel";
import SqlStationRepository from "./repositories/SqlStationRepository";
import EncryptService from "./services/EncryptService";
import UUIDService from "./services/UUIDService";

/* REPOSITORIES */
export const stationRepository = new SqlStationRepository(
  StationModel,
  UserModel
);

/* SERVICES */
export const uuidService = new UUIDService();
export const encryptService = new EncryptService();

/* USES CASES */
export const createUseCase = new CreateUseCase(
  stationRepository,
  uuidService,
  encryptService
);
export const listUseCase= new ListUseCase(stationRepository)

/* CONTROLLERS */
export const createController = new CreateController(createUseCase);
export const listController = new ListController(listUseCase)