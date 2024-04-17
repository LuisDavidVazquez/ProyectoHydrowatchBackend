import Record from "./Record";

export default interface RecordRepository {
  list(stationPk: string): Promise<[Record[] | null , string]>;
  getByPk(pk: string): Promise<[Record | null | undefined, string]>;
}
