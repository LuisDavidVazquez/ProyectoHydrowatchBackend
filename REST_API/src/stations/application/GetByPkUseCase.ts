import Station from "../domain/Station";
import SqlStationRepository from "../infrastructure/repositories/SqlStationRepository";

export default class GetByPkUseCase {
  constructor(readonly repository: SqlStationRepository) {}
  async run(pk: string): Promise<[Station | null |undefined, string]> {
    const result = await this.repository.getByPk(pk);
    return result;
  }
}
