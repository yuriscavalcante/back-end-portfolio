import { CompanyRepositoryProps } from "modules/companies/repositories/CompanyRepositoryProps";
import { NotFound } from "shared/errors/NotFound";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteCompanyUseCase {
  constructor(
    @inject("CompanyRepository")
    private companiesRepository: CompanyRepositoryProps
  ) {}

  public async execute(id: string) {
    const isCompany = await this.companiesRepository.findById(id);
    if (!isCompany) throw new NotFound("Company não encontrada");

    return await this.companiesRepository.delete(isCompany);
  }
}
