import AccessRequest from "../domain/DTOS/AccessRequest";
import AccessResponse from "../domain/DTOS/AccessResponse";
import SqlUserRepository from "../infrasctructure/repositories/SqlUserRepository";
import EncryptInterface from "./interfaces/EncryptInterface";
import TokenInterface from "./interfaces/TokenInterface";

export default class AccessUseCase {
  constructor(
    readonly repository: SqlUserRepository,
    readonly encryptService: EncryptInterface,
    readonly tokenService: TokenInterface
  ) {}
  async run(
    user: AccessRequest
  ): Promise<[null | undefined | AccessResponse, string]> {
    const userFounded = await this.repository.access(user);

    if (userFounded[0] === null) {
      return [null, userFounded[1]];
    }

    if (userFounded[0] === undefined) {
      return [undefined, userFounded[1]];
    }

    if (this.encryptService.compare(userFounded[0].password, user.password)) {
      const response: AccessResponse = {
        id: userFounded[0].id,
        email: userFounded[0].email,
        station_id: userFounded[0].station_id,
        token: this.tokenService.generate(userFounded[0]),
      };
      return [response, userFounded[1]];
    }

    return [undefined, "Credenciales inválidas."];
  }
}
