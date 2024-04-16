import { Request, Response } from "express";
import CreateUseCase from "../../application/CreateUseCase";
import CreateRequest from "../../domain/DTOS/CreateRequest";

export default class CreateController{
    constructor(readonly useCase: CreateUseCase){}
    async run(req:Request, res:Response){
        const request:CreateRequest = {
            name: req.body.name,
            amount: req.body.amount,
            station_id: req.params.station_id,
            seed_time: Date.parse(req.body.seed_time)
        }
        const response = await this.useCase.run(request)
        if(response[0] === null){
            return res.status(500).json({
                msg: response[1],
                data: response[0]
            })
        }

        return res.status(201).json({
            msg: response[1],
            data: response[0]
        })
    }
}