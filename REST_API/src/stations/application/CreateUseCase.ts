import StationRequest from "../domain/DTOS/StationRequest";
import UserRequest from "../domain/DTOS/UserRequest";
import SqlStationRepository from "../infrastructure/repositories/SqlStationRepository";
import EncryptInterface from "./interfaces/EncryptInterface";
import UUIDInterface from "./interfaces/UUIDInterface";

export default class CreateUseCase {
  constructor(
    readonly repository: SqlStationRepository,
    readonly uuidService: UUIDInterface,
    readonly encryptService: EncryptInterface
  ) {}
  async run(station: StationRequest, user: UserRequest) {
    user.id = this.uuidService.generate();
    user.password = this.encryptService.hash(user.password);
    const stationCreated = await this.repository.create(station, user);
    return stationCreated;
  }
}
