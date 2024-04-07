import { User } from "./User";

export interface UserRepository {
    createUser(user : User) : Promise <User | null>
    getUserById(id: string) :  Promise <User | null>
    logInUser(email : string, password : string) : Promise <User | null>
}