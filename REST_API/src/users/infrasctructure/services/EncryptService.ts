import EncryptInterface from "../../application/interfaces/EncryptInterface";
import bcrypt from "bcrypt";

export default class EncryptService implements EncryptInterface {
  compare(hash: string, original: string): boolean {
    return bcrypt.compareSync(original, hash);
  }
  hash(password: string): string {
    return bcrypt.hashSync(
      password,
      parseInt(process.env["SALT_ROUND"] ?? "5")
    );
  }
}
