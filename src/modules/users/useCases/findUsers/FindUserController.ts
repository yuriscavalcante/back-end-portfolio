import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindUserUseCase } from "./FindUserUseCase";

export class FindUserController {
  public async handle(req: Request, res: Response) {
    const query = req.query;

    const findUserUseCase = container.resolve(FindUserUseCase);

    const user = await findUserUseCase.execute(query);

    return res.status(200).json({ message: "Usuário!", user });
  }
}
