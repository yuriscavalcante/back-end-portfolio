import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

export class CreateCompanyController {
  public async handle(req: Request, res: Response) {
    const { name, acronym, cnpj, email, phoneNumber } = req.body;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    const company = await createCompanyUseCase.execute({
      name,
      acronym,
      cnpj,
      email,
      phoneNumber,
    });

    return res
      .status(200)
      .json({ message: "Company cadastrada com sucesso!", company });
  }
}
