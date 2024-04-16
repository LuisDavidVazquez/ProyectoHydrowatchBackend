import AccessUseCase from "../application/AccessUseCase";
import AccessController from "./controllers/AccessController";
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

export const accessController = new AccessController(accessUseCase);
