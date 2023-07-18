import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindCompaniesUseCase } from "./FindCompaniesUseCase";

export class FindCompaniesController {
  public async handle(req: Request, res: Response) {
    const query = req.query;

    const findCompaniesUseCase = container.resolve(FindCompaniesUseCase);

    const [list, total] = await findCompaniesUseCase.execute(query);

    return res.status(200).json({ message: "Companies!", list, total });
  }
}
