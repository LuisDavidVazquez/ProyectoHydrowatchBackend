export default interface CreateRequest {
  id?: string;
  name: string;
  amount: number;
  seed_time?: number;
  station_id: string;
}
