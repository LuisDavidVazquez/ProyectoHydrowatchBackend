import AccessRequest from "../../domain/DTOS/AccessRequest";
import UpdateRequest from "../../domain/DTOS/UpdateRequest";
import User from "../../domain/User";
import UserRepository from "../../domain/UserRepository";
import UserModel from "../models/UserModel";

export default class SqlUserRepository implements UserRepository {
  constructor(readonly model: typeof UserModel) {
    this.model.sync();
  }
  async access(
    credentials: AccessRequest
  ): Promise<[User | null | undefined, string]> {
    try {
      const user = await UserModel.findOne({
        where: { email: credentials.email },
      });
      if (user === null) {
        return [
          undefined,
          "No se ha podido localizar al usuario con el correo proporcionado",
        ];
      }
      return [user, "Usuario encontrado"];
    } catch (error) {
      console.log("Ha ocurrido un error durante el acceso.");
      console.error(error);
      return [null, "Ha ocurrido un error durante el acceso."];
    }
  }
  async list(): Promise<[User[] | null, string]> {
    throw new Error("Method not implemented.");
  }
  async getByPk(pk: string): Promise<[User | null | undefined, string]> {
    throw new Error("Method not implemented.");
  }
  async update(user: UpdateRequest): Promise<[User]> {
    throw new Error("Method not implemented.");
  }
}
