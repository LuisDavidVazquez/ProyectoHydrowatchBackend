import CreateUseCase from "../application/CreateUseCase";
import CreateController from "./controllers/CreateController";
import StationModel from "./models/StationModel";
import UserModel from "./models/UserRepository";
import SqlStationRepository from "./repositories/SqlStationRepository";
import EncryptService from "./services/EncryptService";
import UUIDService from "./services/UUIDService";

export const stationRepository = new SqlStationRepository(
  StationModel,
  UserModel
);

export const uuidService = new UUIDService();
export const encryptService = new EncryptService();

export const createUseCase = new CreateUseCase(
  stationRepository,
  uuidService,
  encryptService
);

export const createController = new CreateController(createUseCase);
