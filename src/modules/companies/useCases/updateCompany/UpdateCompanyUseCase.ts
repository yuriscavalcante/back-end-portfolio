import { UpdateCompaniesDto } from "modules/companies/dto/UpdateCompaniesDto";
import { CompanyRepositoryProps } from "modules/companies/repositories/CompanyRepositoryProps";
import { GeneralErrors } from "shared/errors/GeneralErrors";
import { NotFound } from "shared/errors/NotFound";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateCompanyUseCase {
  constructor(
    @inject("CompanyRepository")
    private companiesRepository: CompanyRepositoryProps
  ) {}

  public async execute({
    id,
    name,
    acronym,
    cnpj,
    email,
    phoneNumber,
  }: UpdateCompaniesDto) {
    const isCompany = await this.companiesRepository.findById(id);
    if (!isCompany) throw new NotFound("Company não encontrada");

    Object.assign(isCompany, {
      name: name,
      acronym: acronym,
      cnpj: cnpj,
      email: email,
      phoneNumber: phoneNumber,
    });

    return await this.companiesRepository.update(isCompany);
  }
}
