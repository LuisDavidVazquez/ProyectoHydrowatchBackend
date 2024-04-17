import mongoDBConnection from "../../database/mongoDBConnection";
import ListUseCase from "../application/ListUseCase";
import ListController from "./controllers/ListController";
import RecordModel from "./models/RecordModel";
import MongoRecordRepository from "./repositories/MongoRecordRespository";

const mongoRepository = new MongoRecordRepository(RecordModel, mongoDBConnection);

const listUseCase = new ListUseCase(mongoRepository);

export const listController = new ListController(listUseCase);
