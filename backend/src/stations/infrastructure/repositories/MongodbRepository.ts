import connectionMongodb from "../../../database/mongodb";
import { Station } from "../../domain/Station";
import { StationRepository } from "../../domain/StationRepository";
import StationModel from "../models/StationModel";

export class MongodbRepository implements StationRepository {

    async createStation(station: Station): Promise<Station | null> {
        try {
            connectionMongodb()
            const newStation = new StationModel(
                {
                    name: station.name,
                    plants: station.plants,
                    seedtime: station.seedtime,
                    description: station.description
                }
            )
            const res = await newStation.save()
            return res
        } catch (error) {
            console.log("Error al guardar la estacion\n", error)
            return null
        }
    }

    async getStations(): Promise<Station[] | null> {
        try {
            connectionMongodb()
            const res = await StationModel.find();
            return res
        } catch (error) {
            console.log("Error al encontrar las estaciones\n", error)
            return null
        }
    }

    async getStationById(id : string): Promise<Station | null> {
        try {
            connectionMongodb()
            const res = await StationModel.findById(id)
            return res
        } catch (error) {
            console.log("Error al encontrar estacion\n", error)
            return null
        }
    }

}