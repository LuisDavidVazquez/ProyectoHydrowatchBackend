import { User } from "../../domain/User";

export interface ITokenService {
    createToken(user : User) : Promise<string | null>
    verifyToken(token : string) : Promise <boolean | null>
}