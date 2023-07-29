import { CompanyRepositoryProps } from "modules/companies/repositories/CompanyRepositoryProps";
import { CreateUsersDto } from "modules/users/dto/CreateUsersDto";
import { UsersRepositoryProps } from "modules/users/repository/UsersRepositoryProps";
import { GeneralErrors } from "shared/errors/GeneralErrors";
import { NotFound } from "shared/errors/NotFound";
import { HashProviderProps } from "shared/providers/HashProvider/HashProviderProps";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepositoryProps,
    @inject("HashProvider") private hashProvider: HashProviderProps,
    @inject("CompanyRepository")
    private companiesRepository: CompanyRepositoryProps
  ) {}

  public async execute({
    name,
    email,
    birthDate,
    documents,
    password,
    confirmPassword,
    company,
    phoneNumber,
  }: CreateUsersDto) {
    const isExistingEmail = await this.usersRepository.findByEmail(email);
    if (isExistingEmail) throw new GeneralErrors("Email inválido!");

    if (password !== confirmPassword)
      throw new GeneralErrors("Senhas não conferem!");

    const hashPassword = await this.hashProvider.hash(password);

    if (company) {
      const isCompany = await this.companiesRepository.findById(
        String(company)
      );
      if (!isCompany) throw new NotFound("Empresa não encontrada!");
    }

    const user = {
      name,
      email,
      birthDate,
      documents,
      password: hashPassword,
      phoneNumber,
      company,
    };

    return await this.usersRepository.create(user);
  }
}
