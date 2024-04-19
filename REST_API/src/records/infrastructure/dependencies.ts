import mongoDBConnection from "../../database/mongoDBConnection";
import GetByPkUseCase from "../application/GetByPkUseCase";
import ListUseCase from "../application/ListUseCase";
import GetByPkController from "./controllers/GetByPkController";
import ListController from "./controllers/ListController";
import Auth from "./middlewares/Auth";
import RecordModel from "./models/RecordModel";
import MongoRecordRepository from "./repositories/MongoRecordRespository";
import TokenService from "./services/TokenService";

const mongoRepository = new MongoRecordRepository(
  RecordModel,
  mongoDBConnection
);

const tokenService = new TokenService();

const listUseCase = new ListUseCase(mongoRepository);
const getByPkUseCase = new GetByPkUseCase(mongoRepository);

export const listController = new ListController(listUseCase);
export const getByPkController = new GetByPkController(getByPkUseCase);
export const authMiddleware = new Auth(tokenService);
