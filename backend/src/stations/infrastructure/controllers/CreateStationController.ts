import { Request, Response } from "express";
import { CreateStationUseCase } from "../../application/CreateStationUseCase";

export class CreateStationController {
    constructor(
        readonly createStationUseCase: CreateStationUseCase
    ) { }

    async run(req: Request, res: Response) {
        const data = req.body;
        try {
            const station = await this.createStationUseCase.run(
                data.name,
                data.plants,
                data.seedtime,
                data.description
            )
            if (station) {
                res.status(200).send({
                    status: "succes",
                    data: {
                        name: data.name,
                        plants: data.plants,
                        seedtime: data.seedtime,
                        description: data.description
                    }
                })
            } else {
                res.status(204).send({
                    status : "erros",
                    message: "No se pudo crear la estacion"
                })
            }
        } catch (error) {
            res.status(204).send({
                status : "error",
                message: "Ah ocurrido un error inesperado",
                msn: error,
            })
        }
    }
}