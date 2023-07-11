import { CreateUsersDto } from "modules/users/dto/CreateUsersDto";
import { UsersRepositoryProps } from "modules/users/repository/UsersRepositoryProps";
import { GeneralErrors } from "shared/errors/GeneralErrors";
import { HashProviderProps } from "shared/providers/HashProvider/HashProviderProps";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepositoryProps,
    @inject("HashProvider") private hashProvider: HashProviderProps
  ) {}

  public async execute({
    name,
    email,
    birthDate,
    documents,
    password,
    confirmPassword,
    phoneNumber,
  }: CreateUsersDto) {
    const isExistingEmail = await this.usersRepository.findByEmail(email);
    if (isExistingEmail) throw new GeneralErrors("Email inválido!");

    if (password !== confirmPassword)
      throw new GeneralErrors("Senhas não conferem!");

    const hashPassword = await this.hashProvider.hash(password);

    const user = {
      name,
      email,
      birthDate,
      documents,
      password: hashPassword,
      phoneNumber,
    };

    return await this.usersRepository.create(user);
  }
}
