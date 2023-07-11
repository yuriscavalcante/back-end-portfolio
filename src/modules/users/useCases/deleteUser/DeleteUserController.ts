import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  public async handle(req: Request, res: Response) {
    const id = req.params.id;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    const user = await deleteUserUseCase.execute(id);

    return res
      .status(200)
      .json({ message: "Usuário removido com sucesso!", user });
  }
}
