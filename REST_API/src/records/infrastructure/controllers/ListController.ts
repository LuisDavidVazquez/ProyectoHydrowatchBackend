import { Request, Response } from "express";
import ListUseCase from "../../application/ListUseCase";

export default class ListController {
  constructor(readonly useCase: ListUseCase) {}
  async run(req: Request, res: Response) {
    const result = await this.useCase.run(req.params.id);
    if (result[0] === null) {
      return res.status(500).json({
        msg: result[1],
        data: null,
      });
    }
    return res.status(200).json({
      msg: result[1],
      data: {
        records: result[0][0],
        stats: result[0][1],
      },
    });
  }
}
