import { CompanyRepositoryProps } from "modules/companies/repositories/CompanyRepositoryProps";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindCompaniesUseCase {
  constructor(
    @inject("CompanyRepository")
    private companiesRepository: CompanyRepositoryProps
  ) {}

  public async execute(query: any) {
    return await this.companiesRepository.find(query);
  }
}
