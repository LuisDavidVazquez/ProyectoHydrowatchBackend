import Station from "../domain/Station";
import SqlStationRepository from "../infrastructure/repositories/SqlStationRepository";

export default class ListUseCase {
  constructor(readonly repository: SqlStationRepository) {}
  async run(): Promise<[Station[] | null, string]> {
    return this.repository.list();
  }
}
