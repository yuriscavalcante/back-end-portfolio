import { UsersRepositoryProps } from "modules/users/repository/UsersRepositoryProps";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepositoryProps
  ) {}

  public async execute(query: any) {
    return await this.usersRepository.find(query);
  }
}
