import EncryptInterface from "../../application/interfaces/EncryptInterface";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export default class EncryptService implements EncryptInterface {
  hash(password: string): string {
    return bcrypt.hashSync(
      password,
      parseInt(process.env["SALT_ROUND"] ?? "5")
    );
  }
}
