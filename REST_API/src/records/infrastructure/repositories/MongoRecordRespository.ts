import Record from "../../domain/Record";
import RecordRepository from "../../domain/RecordRepository";
import RecordModel from "../models/RecordModel";

export default class MongoRecordRepository implements RecordRepository {
  constructor(
    readonly model: typeof RecordModel,
    readonly connection: Function
  ) {}
  async list(stationPk: string): Promise<[Record[] | null, string]> {
    try {
      await this.connection();
      const result = await this.model.find({ station: stationPk });
      const response: Record[] = [];

      result.map((inde) => {
        response.push({
          humedad: inde.humedad!,
          temperature: inde.temperature!,
          level_water: inde.level_water!,
          nivel_ph: inde.nivel_ph!,
          station: inde.station!,
        });
      });
      return [response, "Consulta exitosa."];
    } catch (error) {
      console.log("Ha ocurrido un error durante la petición.");
      console.error(error);
      return [null, "Ha ocurrido un error durante la petición."];
    }
  }
  async getByPk(pk: string): Promise<[Record | null | undefined, string]> {
    try {
      await this.connection()
      const result = await this.model.findById(pk);
      if (result === null) {
        return [
          undefined,
          "No se halló ningún registro con el ID proporcionado.",
        ];
      }
      const response: Record = {
        humedad: result.humedad!,
        temperature: result.temperature!,
        level_water: result.level_water!,
        nivel_ph: result.nivel_ph!,
        station: result.station!,
      };

      return [response, "Consulta exitosa."];
    } catch (error) {
      console.log("Ha ocurrido un error durante la petición.");
      console.error(error);
      return [null, "Ha ocurrido un error durante la petición."];
    }
    throw new Error("Method not implemented.");
  }
}
