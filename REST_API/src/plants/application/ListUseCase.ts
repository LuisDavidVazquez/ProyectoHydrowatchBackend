import Plant from "../domain/Plant";
import PlantRepository from "../domain/PlantRepository";

export default class ListUseCase {
  constructor(readonly repository: PlantRepository) {}
  async run(pk:string): Promise<[Plant[] | null, string]> {
    return await this.repository.list(pk);
  }
}
