import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthorizeUserUseCase } from "./AuthorizeUserUseCase";

export class AuthorizeUserController {
  public async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authorizeUserUseCase = container.resolve(AuthorizeUserUseCase);

    const user = await authorizeUserUseCase.execute({
      email,
      password,
    });
    return res
      .status(200)
      .json({ message: "Login realizado com sucesso!", user });
  }
}
