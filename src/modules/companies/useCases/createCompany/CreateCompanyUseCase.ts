import { CreateCompaniesDto } from "modules/companies/dto/CreateCompaniesDto";
import { CompanyRepositoryProps } from "modules/companies/repositories/CompanyRepositoryProps";
import { GeneralErrors } from "shared/errors/GeneralErrors";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCompanyUseCase {
  constructor(
    @inject("CompanyRepository")
    private companiesRepository: CompanyRepositoryProps
  ) {}

  public async execute({
    name,
    acronym,
    cnpj,
    email,
    phoneNumber,
  }: CreateCompaniesDto) {
    const hasDuplicate = await this.companiesRepository.findByCnpj(cnpj);
    if (hasDuplicate) throw new GeneralErrors("CNPJ já cadastrado!");

    return await this.companiesRepository.create({
      name,
      acronym,
      cnpj,
      email,
      phoneNumber,
    });
  }
}
