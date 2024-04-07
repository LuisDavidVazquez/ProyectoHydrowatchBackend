import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { EncryptHelper } from "../infrastructure/helpers/EncryptHelper";

export class CreateUserUseCase {
    constructor(
        readonly userRepository: UserRepository,
        readonly encryptHelper : EncryptHelper
    ) { }

    async run(
        email: string,
        password: string,
        data: {
            name: string,
            lastname: string,
            role: string
        }
    ): Promise<User | null> {
        try {
            const passwordEncrypted = this.encryptHelper.encryptPassword(password)
            const user = new User(email, passwordEncrypted, data)
            const result = await this.userRepository.createUser(user)
            console.log(result)
            return result
        } catch (error) {
            return null
        }
    }

}