import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCompanyUseCase } from "./DeleteCompanyUseCase";

export class DeleteCompanyController {
  public async handle(req: Request, res: Response) {
    const id = req.params.id;

    const deleteCompanyUseCase = container.resolve(DeleteCompanyUseCase);

    const company = await deleteCompanyUseCase.execute(id);

    return res
      .status(200)
      .json({ message: "Company removida com sucesso!", company });
  }
}
