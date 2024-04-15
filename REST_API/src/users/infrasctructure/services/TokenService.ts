import TokenInterface from "../../application/interfaces/TokenInterface";
import UserDisplay from "../../domain/DTOS/UserDisplay";
import User from "../../domain/User";
import dotenv, { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default class TokenService implements TokenInterface {
  generate(user: User): string {
    const SECRET = process.env["SECRET_TOKEN"] ?? "DefaultSecret";
    const payload: UserDisplay = {
      id: user.id,
      email: user.email,
      station_id: user.station_id,
    };
    return jwt.sign(payload, SECRET, { algorithm: "HS256" });
  }
  validateAndDecode(token: string): [boolean, UserDisplay | null] {
    const SECRET = process.env["SECRET_TOKEN"] ?? "DefaultSecret";
    try {
      const decode = jwt.verify(token, SECRET);

      if (typeof decode === "string") {
        return [false, null];
      }

      const user: UserDisplay = {
        id: decode?.id,
        email: decode?.email,
        station_id: decode?.station_id,
      };

      return [true, user];
    } catch {
      return [false, null];
    }
    throw new Error("Method not implemented.");
  }
}
