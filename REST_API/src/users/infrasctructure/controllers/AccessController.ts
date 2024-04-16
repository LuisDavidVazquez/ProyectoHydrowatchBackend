import { Request, Response } from "express";
import AccessUseCase from "../../application/AccessUseCase";
import UserRequest from "../../../stations/domain/DTOS/UserRequest";

export default class AccessController {
  constructor(readonly useCase: AccessUseCase) {}
  async run(req: Request, res: Response) {
    const user: UserRequest = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await this.useCase.run(user);

    if (result[0] === null) {
      return res.status(500).json({
        msg: result[1],
        data: result[0],
      });
    }

    if (result[0] === undefined) {
      return res.status(401).json({
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
