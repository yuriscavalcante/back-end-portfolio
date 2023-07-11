import { UpdateUsersDto } from "modules/users/dto/UpdateUsersDto";
import { UsersRepositoryProps } from "modules/users/repository/UsersRepositoryProps";
import { GeneralErrors } from "shared/errors/GeneralErrors";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepositoryProps
  ) {}

  public async execute({
    id,
    name,
    email,
    birthDate,
    documents,
    phoneNumber,
  }: UpdateUsersDto) {
    const isUser = await this.usersRepository.findById(id);
    if (!isUser) throw new GeneralErrors("Usuario não encontrado!");

    if (email) {
      const isExistingEmail = await this.usersRepository.findByEmail(email);
      if (isExistingEmail) throw new GeneralErrors("Email inválido!");
    }

    Object.assign(isUser, {
      name,
      email,
      birthDate,
      documents,
      phoneNumber,
    });

    return await this.usersRepository.update(isUser);
  }
}
