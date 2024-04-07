import bcrypt from 'bcrypt'
import { IEncryptService } from "../../application/services/IEncryptService";

export class EncryptHelper implements IEncryptService{

    encryptPassword(password: string): string{
        try {
            const passwordEncrypted = bcrypt.hashSync(password, 12)
            return passwordEncrypted;
        } catch (error) {
            console.log("Hubo un error al encriptar la contraseña\n", error);
            return "Hubo un error al encriptar la contraseña";
        }
    }

    authPassword(password: string, passwordEncrypted: string): boolean {
        try {
            const result = bcrypt.compareSync(password, passwordEncrypted)
            return result;
        } catch (error) {
            console.log("Hubo un error al autenticar contraseña\n", error)
            return false
        }
    }

}