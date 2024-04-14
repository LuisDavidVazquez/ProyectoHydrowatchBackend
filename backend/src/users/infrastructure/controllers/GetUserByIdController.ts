import { Request, Response } from "express";
import { GetUserByIdUseCase } from "../../application/GetUserByIdUseCase";

export class GetUserByIdController {
    constructor (
        readonly getUserByIdUseCase : GetUserByIdUseCase
    ) {}

    async run (req : Request, res : Response) {
        const id = req.params.id
        try {
            const user = await this.getUserByIdUseCase.run(
                id
            );
            if (user)
                res.status(201).send({
                    status: "success",
                    data: {
                        email: user?.email,
                        password: user?.password,
                        data: user?.data,
                    },
                });
            else
                res.status(204).send({
                    status: "error",
                    data: "No se pudo crear el usuario",
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