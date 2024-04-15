import UUIDInterface from "../../application/interfaces/UUIDInterface";
import { v4 as uuidv4 } from "uuid";

export default class UUIDService implements UUIDInterface {
  generate(): string {
    return uuidv4();
  }
}
