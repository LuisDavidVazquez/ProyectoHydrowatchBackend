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
    try {
      const results = await UserModel.findAll();
      return [results, "Consulta exitosa"];
    } catch (error) {
      console.log("Ha ocurrido un error durante el acceso.");
      console.error(error);
      return [null, "Ha ocurrido un error durante el acceso."];
    }
  }
  async getByPk(pk: string): Promise<[User | null | undefined, string]> {
    try {
      const result = await UserModel.findByPk(pk);
      if (result === null) {
        return [undefined, "El usuario con el ID proporcionado no existe."];
      }
      return [result, "Consulta exitosa."];
    } catch (error) {
      console.log("Ha ocurrido un error durante el acceso.");
      console.error(error);
      return [null, "Ha ocurrido un error durante el acceso."];
    }
  }
  async update(
    user: UpdateRequest,
    pk: string
  ): Promise<[User | null | undefined, string]> {
    try {
      const userToUpdate = await this.model.findByPk(pk);
      if (userToUpdate === null) {
        return [undefined, "El usuario que desea modificar no existe."];
      }
      userToUpdate.set({
        email: user.email === undefined ? userToUpdate.email : user.email,
        password:
          user.password === undefined ? userToUpdate.password : user.password,
      });

      await userToUpdate.save();
      return [userToUpdate, "Usuario modificado con éxito."];
    } catch (error) {
      console.log("Ha ocurrido un error durante el acceso.");
      console.error(error);
      return [null, "Ha ocurrido un error durante el acceso."];
    }
  }
}
