export interface IEncryptService {

    encryptPassword (password : string) : string
    authPassword (password : string, passwordEncrypted : string ) : boolean

}