import AccessRequest from "../../domain/DTOS/AccessRequest";
import UpdateRequest from "../../domain/DTOS/UpdateRequest";
import User from "../../domain/User";
import UserRepository from "../../domain/UserRepository";
import UserModel from "../models/UserModel";

export default class SqlUserRepository implements UserRepository {
  constructor(readonly model: typeof UserModel) {
    this.model.sync();
  }
  access(
    credentials: AccessRequest
  ): Promise<[User | null | undefined, string]> {
    throw new Error("Method not implemented.");
  }
  list(): Promise<[User[] | null, string]> {
    throw new Error("Method not implemented.");
  }
  getByPk(pk: string): Promise<[User | null | undefined, string]> {
    throw new Error("Method not implemented.");
  }
  update(user: UpdateRequest): Promise<[User]> {
    throw new Error("Method not implemented.");
  }
}
