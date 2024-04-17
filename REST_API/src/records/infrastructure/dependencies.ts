import mongoDBConnection from "../../database/mongoDBConnection";
import GetByPkUseCase from "../application/GetByPkUseCase";
import ListUseCase from "../application/ListUseCase";
import GetByPkController from "./controllers/GetByPkController";
import ListController from "./controllers/ListController";
import RecordModel from "./models/RecordModel";
import MongoRecordRepository from "./repositories/MongoRecordRespository";

const mongoRepository = new MongoRecordRepository(
  RecordModel,
  mongoDBConnection
);

const listUseCase = new ListUseCase(mongoRepository);
const getByPkUseCase = new GetByPkUseCase(mongoRepository);

export const listController = new ListController(listUseCase);
export const getByPkController = new GetByPkController(getByPkUseCase);
