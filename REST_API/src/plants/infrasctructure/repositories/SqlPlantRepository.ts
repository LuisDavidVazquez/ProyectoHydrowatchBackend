import CreateRequest from "../../domain/DTOS/CreateRequest";
import UpdateRequest from "../../domain/DTOS/UpdateRequest";
import Plant from "../../domain/Plant";
import PlantRepository from "../../domain/PlantRepository";
import PlantModel from "../models/PlantModel";
import StationModel from "../models/StationModel";

export class SqlPlantRespository implements PlantRepository {
  constructor(
    readonly plantModel: typeof PlantModel,
    readonly stationModel: typeof StationModel
  ) {
    this.plantModel.sync();
    this.stationModel.sync();
  }
  async add(plant: CreateRequest): Promise<[Plant | null, string]> {
    try {
      const stationExistencie = await this.stationModel.count({
        where: {
          id: plant.station_id,
        },
      });

      if (stationExistencie === 0) {
        return [null, "La estación no existe"];
      }

      const newPlant = new this.plantModel({
        id: plant.id!,
        name: plant.name,
        amount: plant.amount,
        seed_time: plant.seed_time || Date.now(),
        station_id: plant.station_id,
      });

      const response = await newPlant.save();
      return [response, "Consulta exitosa"];
    } catch (error) {
      console.log("Ha ocurrido un error en tu petición");
      console.error(error);
      return [null, "Ha ocurrido un error en tu petición"];
    }
  }
  async list(pk: string): Promise<[Plant[] | null, string]> {
    try {
      const response = await this.plantModel.findAll({
        where: { station_id: pk },
      });
      return [response, "Consulta exitosa"];
    } catch (error) {
      console.log("Ha ocurrido un error durante la petición.");
      console.error(error);
      return [null, "Ha ocurrido un error durante petición"];
    }
  }
  async getByPk(pk: string): Promise<[Plant | null | undefined, string]> {
    throw new Error("Method not implemented.");
  }
  async remove(pk: string): Promise<[null | undefined, string]> {
    throw new Error("Method not implemented.");
  }
  async update(
    plant: UpdateRequest,
    pk: string
  ): Promise<[Plant | null | undefined, string]> {
    throw new Error("Method not implemented.");
  }
}
