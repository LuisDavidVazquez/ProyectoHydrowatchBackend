import { Request, Response } from "express";
import { LogInUserUseCase } from "../../application/LogInUserUseCase";

export class LogInUserController {
    constructor (
        readonly logInUserUseCase : LogInUserUseCase
    ) {}

    async run (req : Request, res : Response) {
        const data = req.body        
        try {
            const user = await this.logInUserUseCase.run(
                data.email,
                data.password
            );
            if (user)
                res.status(201).send({
                    status: "success",
                    token: user
                });
            else
                res.status(204).send({
                    status: "error",
                    data: "No se pudo ingresar correctamente",
                });
        } catch (error) {
            res.status(204).send({
                status: "error",
                data: "Ah ocurrido un error inesperado",
                msn: error,
            });
        }
    }
}