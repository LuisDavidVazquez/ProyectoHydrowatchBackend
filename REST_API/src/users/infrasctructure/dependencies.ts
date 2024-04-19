import AccessUseCase from "../application/AccessUseCase";
import AuthUseCase from "../application/AuthUseCase";
import GetByPkUseCase from "../application/GetByPkUseCase";
import ListUseCase from "../application/ListUseCase";
import UpdateUseCase from "../application/UpdateUseCase";
import AccessController from "./controllers/AccessController";
import AuthController from "./controllers/AuthController";
import GetByPkController from "./controllers/GetByPkController";
import ListController from "./controllers/ListController";
import UpdateController from "./controllers/UpdateController";
import Auth from "./middlewares/Auth";
import UserModel from "./models/UserModel";
import SqlUserRepository from "./repositories/SqlUserRepository";
import EncryptService from "./services/EncryptService";
import TokenService from "./services/TokenService";

const sqlUserRepository = new SqlUserRepository(UserModel);

const encryptService = new EncryptService();
const tokenService = new TokenService();

const accessUseCase = new AccessUseCase(
  sqlUserRepository,
  encryptService,
  tokenService
);
const listUseCase = new ListUseCase(sqlUserRepository);
const getByPkUseCase = new GetByPkUseCase(sqlUserRepository);
const authUseCase = new AuthUseCase(tokenService);
const updateUseCase = new UpdateUseCase(
  sqlUserRepository,
  encryptService,
  tokenService
);

export const accessController = new AccessController(accessUseCase);
export const listController = new ListController(listUseCase);
export const getByPkController = new GetByPkController(getByPkUseCase);
export const authController = new AuthController(authUseCase);
export const updateController = new UpdateController(updateUseCase);
export const authMiddleware = new Auth(tokenService);
