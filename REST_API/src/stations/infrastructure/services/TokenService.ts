import TokenInterface from "../../application/interfaces/TokenInterface";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default class TokenService implements TokenInterface {
  validate(token: string): boolean {
    const SECRET = process.env["SECRET_TOKEN"] ?? "DefaultSecret";
    try {
      const decode = jwt.verify(token, SECRET);

      if (typeof decode === "string") {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }
}
