import connectionMongodb from "../../../database/mongodb";
import { Station } from "../../domain/Station";
import { StationRepository } from "../../domain/StationRepository";
import StationModel from "../models/StationModel";

export class MongodbRepository implements StationRepository {

    async createStation(user: Station): Promise<Station | null> {
        try {
            connectionMongodb()
            const newStation = new StationModel(
                {
                    name: user.name,
                    plants: user.plants,
                    seedtime: user.seedtime,
                    description: user.description
                }
            )
            const res = await newStation.save()
            return res
        } catch (error) {
            console.log("Error al guardar la estacion\n", error)
            return null
        }
    }

    // async getUserById(id: string): Promise<User | null> {
    //     try {
    //         connectionMongodb()
    //         const res = await UserModel.findById(id);
    //         return res
    //     } catch (error) {
    //         console.log("Error al encontrar usuario\n", error)
    //         return null
    //     }
    // }

    // async logInUser(email: string, password: string): Promise<User | null> {
    //     try {
    //         connectionMongodb()
    //         const res = await UserModel.findOne({email : email})
    //         return res
    //     } catch (error) {
    //         console.log("Error al encontrar usuario\n", error)
    //         return null
    //     }
    // }

}