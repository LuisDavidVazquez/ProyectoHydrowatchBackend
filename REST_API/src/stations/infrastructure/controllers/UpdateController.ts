import { Request, Response } from "express";
import UpdateUseCase from "../../application/UpdateUseCase";
import StationUpdate from "../../domain/DTOS/StationUpdate";

export default class UpdateController {
  constructor(readonly useCase: UpdateUseCase) {}
  async run(req: Request, res: Response) {
    const station: StationUpdate = {
      name: req.body.name,
      description: req.body.description,
    };
    const result = await this.useCase.run(station, req.params.id);
    if (result[0] === null) {
      return res.status(500).json({
        msg: result[1],
        data: null,
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
