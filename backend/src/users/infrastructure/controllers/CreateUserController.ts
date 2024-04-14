import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/CreateUserUseCase";

export class CreateUserController {
    constructor(
        readonly createUserUseCase: CreateUserUseCase,
    ) {}
    async run(req: Request, res: Response) {
        const data = req.body
        try {
            const user = await this.createUserUseCase.run(
                data.email,
                data.password,
                data.data
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