import UserDisplay from "../domain/DTOS/UserDisplay";
import UserRepository from "../domain/UserRepository";

export default class ListUseCase {
  constructor(readonly repository: UserRepository) {}
  async run(): Promise<[UserDisplay[] | null, string]> {
    const result = await this.repository.list();
    if (result[0] === null) {
      return result;
    }

    const response: UserDisplay[] = [];
    result[0].map((user) => {
      response.push({
        id: user.id,
        email: user.email,
        station_id: user.password,
      });
    });

    return [response, result[1]];
  }
}
