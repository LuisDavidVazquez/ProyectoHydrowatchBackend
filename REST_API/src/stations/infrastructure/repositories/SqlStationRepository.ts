import StationRequest from "../../domain/DTOS/StationRequest";
import UserRequest from "../../domain/DTOS/UserRequest";
import Station from "../../domain/Station";
import StationRepository from "../../domain/StationRepository";
import StationModel from "../models/StationModel";
import UserModel from "../models/UserRepository";

export default class SqlStationRepository implements StationRepository {
  constructor(
    readonly stationModel: typeof StationModel,
    readonly userModel: typeof UserModel
  ) {
    this.stationModel.sync();
    this.userModel.sync();
  }
  async create(
    station: StationRequest,
    user: UserRequest
  ): Promise<[Station, string] | [null, string]> {
    const foundStation = await this.stationModel.findByPk(station.id);

    if (foundStation) {
      console.log("La estación ya existe.");
      return [null, "La estación ya existe."];
    }

    const newUser = new this.userModel({
      id: user.id!,
      email: user.email,
      password: user.password,
      station_id: station.id,
    });

    const newStation = new this.stationModel({
      id: station.id,
      name: station.name,
      description: station.description,
      user_id: user.id!,
    });

    try{
        await newUser.save();
        await newStation.save();
    }catch(error){
        console.log("No se pudo completar tu petición.")
        console.error(error)
        return[null, "No se pudo completar tu peticion."]
    }

    const response:Station= {
        id: newStation.id,
        name: newStation.name,
        user_id: newStation.user_id
    }

    return [response, "Estación y cuenta creada con éxito."];
  }
  private async get_station_by_pk(pk: string): Promise<Station | null> {
    throw new Error("Method not implemented.");
  }
}
