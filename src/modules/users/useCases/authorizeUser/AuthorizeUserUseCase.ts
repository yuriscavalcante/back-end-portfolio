import { LoginDto } from "modules/users/dto/LoginDto";
import { UsersRepositoryProps } from "modules/users/repository/UsersRepositoryProps";
import { GeneralErrors } from "shared/errors/GeneralErrors";
import { HashProviderProps } from "shared/providers/HashProvider/HashProviderProps";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { auth } from "config/auth";

@injectable()
export class AuthorizeUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepositoryProps,
    @inject("HashProvider") private hashProvider: HashProviderProps
  ) {}

  public async execute({ email, password }: LoginDto) {
    const isUser = await this.usersRepository.findByEmail(email);
    if (!isUser) throw new GeneralErrors("Email ou senha incorreto!");

    const passwordIsValid = await this.hashProvider.compare(
      password,
      isUser.password
    );
    if (!passwordIsValid) throw new GeneralErrors("Email ou senha incorreto!");

    // if (!isUser.confirmed_email || !isUser.isActive) {
    //     throw new GeneralErrors('Acesso a plataforma não permitido');
    //   }

    const token = sign({}, auth.secret_token as string, {
      subject: String(isUser.id),
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token as string, {
      subject: String(isUser.id),
      expiresIn: auth.expires_in_refresh_token,
    });

    return { user: isUser, token, refresh_token };
  }
}
