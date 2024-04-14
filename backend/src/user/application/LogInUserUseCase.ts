import { UserRepository } from "../domain/UserRepository";
import { EncryptHelper } from "../infrastructure/helpers/EncryptHelper";
import { TokenHelper } from "../infrastructure/helpers/TokenHelper";

export class LogInUserUseCase {
    constructor( 
        readonly userRepository : UserRepository,
        readonly encryptHelper : EncryptHelper,
        readonly tokenHelper : TokenHelper
    ){}

    async run( email : string, password : string) : Promise <null | string > {
        try {
            const userFound = await this.userRepository.logInUser(email, password);
            console.log(userFound);
            if(userFound) {        
                if(this.encryptHelper.authPassword(password, userFound.password)){
                    return this.tokenHelper.createToken(userFound);
                }
            }
            return null
        } catch (error) {
            console.log(error);
            return null
        }    
    }
}