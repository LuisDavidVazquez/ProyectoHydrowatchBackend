import TokenInterface from "./interfaces/TokenInterface";

export default class AuthUseCase {
  constructor(readonly tokenService: TokenInterface) {}
  run(token: string) {
    return this.tokenService.validateAndDecode(token);
  }
}
