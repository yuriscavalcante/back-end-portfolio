import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  public async handle(req: Request, res: Response) {
    const id = req.params.id;
    const { name, email, documents, birthDate, phoneNumber } = req.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({
      id,
      name,
      email,
      documents,
      birthDate,
      phoneNumber,
    });

    return res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso!", user });
  }
}
