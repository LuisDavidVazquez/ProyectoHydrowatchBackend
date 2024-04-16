import PlantRepository from "../domain/PlantRepository";

export default class DeleteUseCase {
  constructor(readonly respoitory: PlantRepository) {}
  async run(pk: string): Promise<[null | undefined, string]> {
    return await this.respoitory.remove(pk);
  }
}
