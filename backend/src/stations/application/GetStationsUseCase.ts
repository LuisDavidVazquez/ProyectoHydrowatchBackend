import { Station } from "../domain/Station";
import { StationRepository } from "../domain/StationRepository";

export class GetStationsUseCase {
    constructor (
        readonly stationRepository : StationRepository
    ) {}

    async run() : Promise <Station[] | null> {
        try {
            const result = await this.stationRepository.getStations()
            console.log(result);
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
}