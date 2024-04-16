import StationUpdate from "../domain/DTOS/StationUpdate";
import Station from "../domain/Station";
import SqlStationRepository from "../infrastructure/repositories/SqlStationRepository";

export default class UpdateUseCase {
  constructor(readonly repository: SqlStationRepository) {}
  async run(
    station: StationUpdate,
    pk: string
  ): Promise<[Station | null | undefined, string]> {
    const result = await this.repository.update(station, pk);
    return result;
  }
}
