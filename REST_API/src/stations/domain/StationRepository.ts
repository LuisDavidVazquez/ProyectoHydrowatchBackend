import StationRequest from "./DTOS/StationRequest";
import StationUpdate from "./DTOS/StationUpdate";
import UserRequest from "./DTOS/UserRequest";
import Station from "./Station";

export default interface StationRepository {
  create(
    station: StationRequest,
    user: UserRequest
  ): Promise<[Station | null, string]>;
  list(): Promise<[Array<Station> | null, string]>;
  getByPk(pk: string): Promise<[Station | null | undefined, string]>;
  update(station: StationUpdate): Promise<[Station | null, string]>;
}
