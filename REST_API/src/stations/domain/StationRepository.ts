import StationRequest from "./DTOS/StationRequest";
import UserRequest from "./DTOS/UserRequest";
import Station from "./Station";

export default interface StationRepository {
  create(
    station: StationRequest,
    user: UserRequest
  ): Promise<[Station, string] | [null, string]>;
}
