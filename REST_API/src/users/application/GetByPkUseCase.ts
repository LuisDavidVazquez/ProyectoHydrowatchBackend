import UserDisplay from "../domain/DTOS/UserDisplay";
import UserRepository from "../domain/UserRepository";

export default class GetByPkUseCase {
  constructor(readonly repository: UserRepository) {}
  async run(pk: string) {
    const result = await this.repository.getByPk(pk);
    if (result[0] === null || result[0] === undefined) {
      return result;
    }
    const response: UserDisplay = {
      id: result[0].id,
      email: result[0].email,
      station_id: result[0].station_id,
    };

    return [response, result[1]];
  }
}
