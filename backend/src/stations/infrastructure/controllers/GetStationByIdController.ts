import { Request, Response } from "express";
import { GetStationByIdUseCase } from "../../application/GetStationByIdUseCase";

export class GetStationByIdController {
    constructor(
        readonly getStationByIdUseCase: GetStationByIdUseCase
    ) { }

    async run(req: Request, res: Response) {
        const id = req.params.id
        try {
            const station = await this.getStationByIdUseCase.run(id)
            if (station) {
                res.status(200).send({
                    status: "succes",
                    data: {
                        name: station.name,
                        plants: station.plants,
                        seedtime: station.seedtime,
                        description: station.description
                    }
                })
            } else {
                res.status(204).send({
                    status: "error",
                    message: "No se pudo obtener la estacion"
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