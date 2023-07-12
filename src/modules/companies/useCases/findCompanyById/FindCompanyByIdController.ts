import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindCompanyByIdUseCase } from "./FindCompanyByIdUseCase";

export class FindCompanyByIdController {
  public async handle(req: Request, res: Response) {
    const id = req.params.id;

    const findCompanyByIdUseCase = container.resolve(FindCompanyByIdUseCase);

    const company = await findCompanyByIdUseCase.execute(id);

    return res.status(200).json({ message: "Company!", company });
  }
}
