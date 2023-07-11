import { NextFunction, Request, Response } from "express";
import { GeneralErrors } from "../../../errors/GeneralErrors";
import { NotFound } from "../../../errors/NotFound";
import { TokenError } from "../../../errors/TokenError";

export const catchErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof GeneralErrors ||
    err instanceof NotFound ||
    err instanceof TokenError
  ) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  } else if (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};
