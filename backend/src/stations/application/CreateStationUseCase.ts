import { Station } from "../domain/Station";
import { StationRepository } from "../domain/StationRepository";

export class CreateStationUseCase {
    constructor (
        readonly stationRepository : StationRepository
    ) {}

    async run(
        name : string,
        plants : [{
            name : string,
            amount : number
        }],
        seedtime : Date,
        description : string
    ) : Promise <Station | null> {
        try {
            const station = new Station(name, plants, seedtime, description)
            const result = await this.stationRepository.createStation(station)
            console.log(result);
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
}