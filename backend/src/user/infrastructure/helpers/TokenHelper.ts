import { ITokenService } from "../../application/services/ITokenService";
import { User } from "../../domain/User";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const secret = `${process.env.SECRET_TOKEN}`;

export class TokenHelper implements ITokenService{

    async createToken(user: User): Promise<string> {
        const userObject = {
            email: user.email,
            data:{
                name: user.data.name,
                lastname: user.data.lastname,
                role: user.data.role,
            }
        }
        try {
            const token = jwt.sign(userObject, secret)
            return token;
        } catch (error) {
            console.log("Hubo un error al generar token\n", error);
            return ""
        }
    }

}