import { Request, Response } from "express";
import CreateUseCase from "../../application/CreateUseCase";
import UserRequest from "../../domain/DTOS/UserRequest";
import StationRequest from "../../domain/DTOS/StationRequest";

export default class CreateController {
  constructor(readonly useCase: CreateUseCase) {}
  async run(req: Request, res: Response) {
    const user_to_send: UserRequest = {
      email: req.body.email,
      password: req.body.password,
    };
    const station_to_send: StationRequest = {
      id: req.body.id,
      name: "My Station",
      description: "My first station",
    };

    const response = await this.useCase.run(station_to_send, user_to_send);

    if (response[0] === null) {
      return res.status(500).json({
        msg: response[1],
        data: response[0],
      });
    }

    if (response[0] === undefined) {
      return res.status(409).json({
        msg: response[1],
        data: null,
      });
    }

    return res.status(201).json({
      msg: response[1],
      data: response[0],
    });
  }
}
