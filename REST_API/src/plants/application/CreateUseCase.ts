import CreateRequest from "../domain/DTOS/CreateRequest";
import Plant from "../domain/Plant";
import { SqlPlantRespository } from "../infrasctructure/repositories/SqlPlantRepository";
import UUIDInterface from "./interfaces/UUIDInterface";

export default class CreateUseCase {
  constructor(
    readonly repository: SqlPlantRespository,
    readonly uuidService: UUIDInterface
  ) {}
  async run(plant: CreateRequest): Promise<[Plant | null, string]> {
    plant.id = this.uuidService.generate();
    return await this.repository.add(plant);
  }
}
