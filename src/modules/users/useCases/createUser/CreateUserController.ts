import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  public async handle(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      confirmPassword,
      documents,
      birthDate,
      phoneNumber,
    } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      confirmPassword,
      documents,
      birthDate,
      phoneNumber,
    });

    return res
      .status(200)
      .json({ message: "Usuário cadastrado com sucesso!", user });
  }
}
