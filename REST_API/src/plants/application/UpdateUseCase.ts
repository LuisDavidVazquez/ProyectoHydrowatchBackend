import UpdateRequest from "../domain/DTOS/UpdateRequest";
import PlantRepository from "../domain/PlantRepository";

export default class UpdateUseCase {
  constructor(readonly repository: PlantRepository) {}
  async run(plant: UpdateRequest, pk: string) {
    return await this.repository.update(plant, pk);
  }
}
