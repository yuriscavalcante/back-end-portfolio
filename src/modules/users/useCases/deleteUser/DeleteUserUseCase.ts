import { UsersRepositoryProps } from "modules/users/repository/UsersRepositoryProps";
import { GeneralErrors } from "shared/errors/GeneralErrors";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepositoryProps
  ) {}

  public async execute(id: string) {
    const isUser = await this.usersRepository.findById(id);
    if (!isUser) throw new GeneralErrors("Usuario não encontrado!");
    return await this.usersRepository.delete(isUser);
  }
}
