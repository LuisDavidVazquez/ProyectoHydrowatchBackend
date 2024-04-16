import AccessRequest from "./DTOS/AccessRequest";
import UpdateRequest from "./DTOS/UpdateRequest";
import User from "./User";

export default interface UserRepository {
  access(
    credentials: AccessRequest
  ): Promise<[User | null | undefined, string]>;
  list(): Promise<[User[] | null, string]>;
  getByPk(pk: string): Promise<[User | null | undefined, string]>;
  update(
    user: UpdateRequest,
    pk: string
  ): Promise<[User | null | undefined, string]>;
}
