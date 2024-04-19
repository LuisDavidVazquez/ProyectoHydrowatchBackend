import CreateUseCase from "../application/CreateUseCase";
import GetByPkUseCase from "../application/GetByPkUseCase";
import ListUseCase from "../application/ListUseCase";
import UpdateUseCase from "../application/UpdateUseCase";
import CreateController from "./controllers/CreateController";
import GetByPkController from "./controllers/GetByPkController";
import ListController from "./controllers/ListController";
import UpdateController from "./controllers/UpdateController";
import Auth from "./middlewares/Auth";
import StationModel from "./models/StationModel";
import UserModel from "./models/UserModel";
import SqlStationRepository from "./repositories/SqlStationRepository";
import EncryptService from "./services/EncryptService";
import TokenService from "./services/TokenService";
import UUIDService from "./services/UUIDService";

/* REPOSITORIES */
export const stationRepository = new SqlStationRepository(
  StationModel,
  UserModel
);

/* SERVICES */
export const uuidService = new UUIDService();
export const encryptService = new EncryptService();
export const tokenService = new TokenService();

/* MIDDLEWARE */
export const authMiddleware = new Auth(tokenService);

/* USES CASES */
export const createUseCase = new CreateUseCase(
  stationRepository,
  uuidService,
  encryptService
);
export const listUseCase = new ListUseCase(stationRepository);
export const getByPkUseCase = new GetByPkUseCase(stationRepository);
export const updateUseCase = new UpdateUseCase(stationRepository);

/* CONTROLLERS */
export const createController = new CreateController(createUseCase);
export const listController = new ListController(listUseCase);
export const getByPkController = new GetByPkController(getByPkUseCase);
export const updateController = new UpdateController(updateUseCase);
