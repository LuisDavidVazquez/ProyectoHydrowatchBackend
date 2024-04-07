import connectionMongodb from "../../../database/mongodb";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import UserModel from "../models/UserModel";

export class MongodbRepository implements UserRepository {

    async createUser(user: User): Promise<User | null> {
        try {
            connectionMongodb()
            const newUser = new UserModel(
                {
                    email: user.email,
                    password: user.password,
                    data: user.data
                }
            )
            const res = await newUser.save()
            return res
        } catch (error) {
            console.log("Error al guardar usuario\n", error)
            return null
        }
    }

    async getUserById(id: string): Promise<User | null> {
        try {
            connectionMongodb()
            const res = await UserModel.findById(id);
            return res
        } catch (error) {
            console.log("Error al encontrar usuario\n", error)
            return null
        }
    }

    async logInUser(email: string, password: string): Promise<User | null> {
        try {
            connectionMongodb()
            const res = await UserModel.findOne({email : email})
            return res
        } catch (error) {
            console.log("Error al encontrar usuario\n", error)
            return null
        }
    }

}