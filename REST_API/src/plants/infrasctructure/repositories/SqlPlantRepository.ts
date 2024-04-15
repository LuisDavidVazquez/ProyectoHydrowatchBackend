import CreateRequest from "../../domain/DTOS/CreateRequest";
import UpdateRequest from "../../domain/DTOS/UpdateRequest";
import Plant from "../../domain/Plant";
import PlantRepository from "../../domain/PlantRepository";
import PlantModel from "../models/PlantModel";

export class SqlPlantRespository implements PlantRepository {
  constructor(readonly model: typeof PlantModel) {
    this.model.sync();
  }
  add(plant: CreateRequest): Promise<[Plant | null, string]> {
    throw new Error("Method not implemented.");
  }
  list(): Promise<[Plant[], string]> {
    throw new Error("Method not implemented.");
  }
  getByPk(pk: string): Promise<[Plant | null | undefined, string]> {
    throw new Error("Method not implemented.");
  }
  remove(pk: string): Promise<[null | undefined, string]> {
    throw new Error("Method not implemented.");
  }
  update(
    plant: UpdateRequest,
    pk: string
  ): Promise<[Plant | null | undefined, string]> {
    throw new Error("Method not implemented.");
  }
}
