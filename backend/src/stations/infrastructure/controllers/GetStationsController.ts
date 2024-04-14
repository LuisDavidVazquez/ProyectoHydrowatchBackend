import { Request, Response } from "express";
import { GetStationsUseCase } from "../../application/GetStationsUseCase";

export class GetStationsController {
    constructor(
        readonly getStationsUseCase: GetStationsUseCase
    ) { }

    async run(req: Request, res: Response) {
        try {
            const station = await this.getStationsUseCase.run()
            if (station) {
                res.status(200).send({
                    status: "succes",
                    data: station.map((estacion) => {
                        return {
                            name: estacion.name,
                            plants: estacion.plants,
                            seedtime: estacion.seedtime,
                            description: estacion.description
                        }
                    })
                })
            } else {
                res.status(204).send({
                    status: "error",
                    message: "No se pudo obtener las estaciones"
                })
            }
        } catch (error) {
            res.status(204).send({
                status: "error",
                message: "Ah ocurrido un error inesperado",
                msn: error,
            })
        }
    }
}