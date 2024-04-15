import StationRequest from "../../domain/DTOS/StationRequest";
import StationUpdate from "../../domain/DTOS/StationUpdate";
import UserRequest from "../../domain/DTOS/UserRequest";
import Station from "../../domain/Station";
import StationRepository from "../../domain/StationRepository";
import StationModel from "../models/StationModel";
import UserModel from "../models/UserModel";

export default class SqlStationRepository implements StationRepository {
  constructor(
    readonly stationModel: typeof StationModel,
    readonly userModel: typeof UserModel
  ) {
    this.stationModel.sync();
    this.userModel.sync();
  }

  async list(): Promise<[Station[] | null, string]> {
    try {
      const result = await this.stationModel.findAll();
      return [result, "Consulta exitosa."];
    } catch (error) {
      console.log("Ha ocurrido un error durante la consulta");
      console.error(error);
      return [null, "Ha ocurrido un error durante la consulta"];
    }
  }

  async getByPk(): Promise<[Station | null, string]> {
    throw new Error("Method not implemented.");
  }

  async update(station: StationUpdate): Promise<[Station | null, string]> {
    throw new Error("Method not implemented.");
  }

  async create(
    station: StationRequest,
    user: UserRequest
  ): Promise<[Station, string] | [null, string]> {
    try {
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

      await newUser.save();
      await newStation.save();

      const response: Station = {
        id: newStation.id,
        name: newStation.name,
        user_id: newStation.user_id,
      };

      return [response, "Estación y cuenta creada con éxito."];
    } catch (error) {
      console.log("No se pudo completar tu petición.");
      console.error(error);
      return [null, "No se pudo completar tu peticion."];
    }
  }
}
