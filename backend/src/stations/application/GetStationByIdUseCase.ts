import { Station } from "../domain/Station";
import { StationRepository } from "../domain/StationRepository";

export class GetStationByIdUseCase {
    constructor (
        readonly stationRepository : StationRepository
    ) {}

    async run( id : string) : Promise <Station | null> {
        try {
            const result = await this.stationRepository.getStationById(id)
            console.log(result);
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
}