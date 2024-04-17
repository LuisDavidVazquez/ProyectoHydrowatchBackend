import Avarage from "../domain/DTOS/Avarage";
import Record from "../domain/Record";
import MongoRecordRepository from "../infrastructure/repositories/MongoRecordRespository";

export default class ListUseCase {
  constructor(readonly repository: MongoRecordRepository) {}
  async run(stationPk: string): Promise<[[Record[], Avarage] | null, string]> {
    const result = await this.repository.list(stationPk);

    if (result[0] === null) {
      return [null, result[1]];
    }

    let response: Avarage = {
      avarage_humedad: 0,
      avarage_temperature: 0,
      avarage_level_water: 0,
      avarage_nivel_ph: 0,
    };

    result[0].map((record) => {
      (response.avarage_humedad += record.humedad),
        (response.avarage_level_water += record.level_water),
        (response.avarage_nivel_ph += record.nivel_ph),
        (response.avarage_temperature += record.temperature);
    });

    response.avarage_humedad = response.avarage_humedad / result[0].length;
    response.avarage_level_water =
      response.avarage_level_water / result[0].length;
    response.avarage_nivel_ph = response.avarage_nivel_ph / result[0].length;
    response.avarage_temperature =
      response.avarage_temperature / result[0].length;

    return [[result[0], response], result[1]];
  }
}
