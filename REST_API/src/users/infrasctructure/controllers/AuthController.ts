import { Request, Response } from "express";
import AuthUseCase from "../../application/AuthUseCase";

export default class AuthController {
  constructor(readonly useCase: AuthUseCase) {}
  run(req: Request, res: Response) {
    const result = this.useCase.run(req.params.token);
    if (result[0]) {
      return res.status(200).json({
        msg: "Token válido",
        data: result[1]
      });
    }

    return res.status(401).json({
        msg: "Token inválido",
        data: result[1]
      });
  }
}
