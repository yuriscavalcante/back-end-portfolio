import { LoginDto } from "modules/users/dto/LoginDto";
import { UsersRepositoryProps } from "modules/users/repository/UsersRepositoryProps";
import { GeneralErrors } from "shared/errors/GeneralErrors";
import { HashProviderProps } from "shared/providers/HashProvider/HashProviderProps";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { auth } from "config/auth";
import { UsersTokensRepositoryProps } from "modules/users/repository/UsersTokensRepositoryProps";
import { DateProviderProps } from "shared/providers/DateProvider/DateProviderProps";

@injectable()
export class AuthorizeUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepositoryProps,
    @inject("UsersTokensRepository")
    private usersTokensRepository: UsersTokensRepositoryProps,
    @inject("HashProvider") private hashProvider: HashProviderProps,
    @inject("DateProvider") private dateProvider: DateProviderProps
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

    const userToken = await this.usersTokensRepository.findByUserId(isUser.id);

    if (!userToken) {
      await this.usersTokensRepository.create({
        user_id: isUser.id,
        token: token,
        refresh_token: refresh_token,
        expireAt: this.dateProvider.addDays(auth.expires_in_refresh_token_days),
      });
    }
    if (userToken) {
      const id = userToken.id;
      await this.usersTokensRepository.updateToken({
        id: id,
        user_id: isUser.id,
        token: token,
        refresh_token: refresh_token,
        expireAt: this.dateProvider.addDays(auth.expires_in_refresh_token_days),
      });
    }

    return { user: isUser, token, refresh_token };
  }
}
