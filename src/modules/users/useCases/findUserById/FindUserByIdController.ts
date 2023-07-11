import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

export class FindUserByIdController {
  public async handle(req: Request, res: Response) {
    const id = req.params.id;

    const findUserByIdUseCase = container.resolve(FindUserByIdUseCase);

    const user = await findUserByIdUseCase.execute(id);

    return res.status(200).json({ message: "Usuário!", user });
  }
}
