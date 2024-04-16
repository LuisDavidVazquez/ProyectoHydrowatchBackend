import UserDisplay from "../../domain/DTOS/UserDisplay";
import User from "../../domain/User";

export default interface TokenInterface {
  generate(user: User): string;
  validateAndDecode(token: string): [boolean, UserDisplay | null];
}
