import { Request, Response } from "express";
import UpdateUseCase from "../../application/UpdateUseCase";
import UpdateRequest from "../../domain/DTOS/UpdateRequest";

export default class UpdateController {
  constructor(readonly useCase: UpdateUseCase) {}
  async run(req: Request, res: Response) {
    const plant: UpdateRequest = {
      name: req.body.name,
      amount: req.body.amount,
      seed_time: req.body.seed_time,
    };
    const result = await this.useCase.run(plant, req.params.id);

    if (result[0] === null) {
      return res.status(500).json({
        msg: result[1],
        data: result[0],
      });
    }

    if (result[0] === undefined) {
      return res.status(404).json({
        msg: result[1],
        data: null,
      });
    }

    return res.status(200).json({
      msg: result[1],
      data: result[0],
    });
  }
}
