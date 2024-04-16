import { Request, Response } from "express";
import ListUseCase from "../../application/ListUseCase";

export default class ListController {
  constructor(readonly useCase: ListUseCase) {}
  async run(req: Request, res: Response) {
    const data = await this.useCase.run();
    return res.status(200).json({
      msg: data[1],
      data: data[0],
    });
  }
}
