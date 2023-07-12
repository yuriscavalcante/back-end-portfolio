import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCompanyUseCase } from "./UpdateCompanyUseCase";

export class UpdateCompanyController {
  public async handle(req: Request, res: Response) {
    const { name, acronym, cnpj, email, phoneNumber } = req.body;
    const id = req.params.id;

    const updateCompanyUseCase = container.resolve(UpdateCompanyUseCase);

    const company = await updateCompanyUseCase.execute({
      id,
      name,
      acronym,
      cnpj,
      email,
      phoneNumber,
    });

    return res
      .status(200)
      .json({ message: "Company atualizada com sucesso!", company });
  }
}
