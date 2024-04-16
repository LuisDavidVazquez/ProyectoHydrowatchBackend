import AccessResponse from "../domain/DTOS/AccessResponse";
import UpdateRequest from "../domain/DTOS/UpdateRequest";
import UserRepository from "../domain/UserRepository";
import EncryptInterface from "./interfaces/EncryptInterface";
import TokenInterface from "./interfaces/TokenInterface";

export default class UpdateUseCase {
  constructor(
    readonly repository: UserRepository,
    readonly encryptService: EncryptInterface,
    readonly tokenService: TokenInterface
  ) {}
  async run(
    user: UpdateRequest,
    pk: string
  ): Promise<[AccessResponse | null | undefined, string]> {
    user.password =
      user.password === undefined
        ? undefined
        : this.encryptService.hash(user.password);

    const result = await this.repository.update(user, pk);
    if (result[0] === null || result[0] === undefined) {
      return [result[0], result[1]];
    }

    const response: AccessResponse = {
      id: result[0].id,
      email: result[0].email,
      station_id: result[0].station_id,
      token: this.tokenService.generate(result[0]),
    };

    return [response, result[1]];
  }
}
