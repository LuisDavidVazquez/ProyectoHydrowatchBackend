import { NextFunction, Request, Response } from "express";
import TokenInterface from "../../application/interfaces/TokenInterface";

export default class Auth {
  constructor(readonly tokenService: TokenInterface) {}
  run(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        msg: "Necesita un token de autenticación para realizar esta acción.",
        data: null,
      });
    }
    const isValid = this.tokenService.validate(
      authHeader.replace("Bearer ", "")
    );

    if (!isValid) {
      return res.status(401).json({
        msg: "Su token ha expirado.",
        data: null,
      });
    }

    next();
  }
}
