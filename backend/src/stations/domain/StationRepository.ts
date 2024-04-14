import { Station } from "./Station";

export interface StationRepository {
    createStation(statiom : Station) : Promise <Station | null>
    // getStations() : Promise <Station[] | null>
    // getStationById(id: string) :  Promise <Station | null>
}