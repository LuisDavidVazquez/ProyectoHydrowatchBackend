import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class GetUserByIdUseCase {
    constructor(
        readonly userRepository : UserRepository
    ) {}

    async run( id : string) : Promise <User | null> {
        try {
            const userFound = await this.userRepository.getUserById(id);
            console.log(userFound);            
            return userFound
        } catch (error) {
            console.log(error);
            return null
        }
    }
}