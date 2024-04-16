import { Request, Response } from "express";
import DeleteUseCase from "../../application/DeleteUseCase";

export default class DeleteController {
  constructor(readonly useCase: DeleteUseCase) {}
  async run(req: Request, res: Response) {
    const response = await this.useCase.run(req.params.id);
    if (response[0] === null) {
      return res.status(410).json({
        msg: response[1],
        data: null,
      });
    }

    return res.status(200).json({
      msg: response[1],
      data: null,
    });
  }
}
