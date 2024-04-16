import Plant from "../domain/Plant";
import PlantRepository from "../domain/PlantRepository";

export default class GetByPkUseCase {
  constructor(readonly repository: PlantRepository) {}
  async run(pk: string): Promise<[Plant | null | undefined, string]> {
    return await this.repository.getByPk(pk);
  }
}
