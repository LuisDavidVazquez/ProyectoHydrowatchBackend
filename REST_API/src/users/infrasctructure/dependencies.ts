import AccessUseCase from "../application/AccessUseCase";
import GetByPkUseCase from "../application/GetByPkUseCase";
import ListUseCase from "../application/ListUseCase";
import AccessController from "./controllers/AccessController";
import GetByPkController from "./controllers/GetByPkController";
import ListController from "./controllers/ListController";
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

export const accessController = new AccessController(accessUseCase);
export const listController = new ListController(listUseCase);
export const getByPkController = new GetByPkController(getByPkUseCase);
