import CreateRequest from "./DTOS/CreateRequest";
import UpdateRequest from "./DTOS/UpdateRequest";
import Plant from "./Plant";

export default interface PlantRepository {
  add(plant: CreateRequest): Promise<[Plant | null, string]>;
  list(): Promise<[Plant[], string]>;
  getByPk(pk: string): Promise<[Plant | null | undefined, string]>;
  remove(pk: string): Promise<[null | undefined, string]>;
  update(
    plant: UpdateRequest,
    pk: string
  ): Promise<[Plant | null | undefined, string]>;
}
