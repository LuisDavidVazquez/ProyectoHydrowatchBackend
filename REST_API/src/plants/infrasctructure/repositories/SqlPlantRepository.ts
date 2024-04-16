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
    try {
      const plant = await PlantModel.findByPk(pk);
      if (plant === null) {
        return [undefined, "No se ha encontrado una planta con el id dado."];
      }

      return [plant, "Consulta exitosa"];
    } catch (error) {
      console.log("Ha ocurrido un error durante la petición.");
      console.error(error);
      return [null, "No se pudo completar tu petición en este momento."];
    }
  }

  async remove(pk: string): Promise<[null | undefined, string]> {
    try {
      const plant = await PlantModel.findByPk(pk);
      if (plant === null) {
        return [null, "El elemento que desea eliminar no existe."];
      }
      await plant.destroy();
      return [undefined, "Se ha eliminado la planta de tu estación."];
    } catch (error) {
      console.log("No se pudo completar tu petición en este momento.");
      console.error(error);
      return [null, "No se pudo completar tu petición en este momento."];
    }
  }

  async update(
    plant: UpdateRequest,
    pk: string
  ): Promise<[Plant | null | undefined, string]> {
    try {
      const plantToUpdate = await this.plantModel.findByPk(pk);
      if (plantToUpdate === null) {
        return [undefined, "La planta que desea actualizar no existe."];
      }

      plantToUpdate.set({
        name: plant.name === undefined ? plantToUpdate.name : plant.name,
        amount:
          plant.amount === undefined ? plantToUpdate.amount : plant.amount,
        seed_time:
          plant.seed_time === undefined
            ? plantToUpdate.seed_time
            : plant.seed_time,
      });

      await plantToUpdate.save();
      return [plantToUpdate, "Planta actualizada con éxito."];
    } catch (error) {
      console.log("No se pudo completar tu petición.");
      console.error(error);
      return [null, "No se pudo completar tu petición."];
    }
  }
}
