import { Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";
import { CreateUserTokenDto } from "modules/users/dto/CreateUserTokenDto";
import { UpdateUserTokenDto } from "modules/users/dto/UpdateUserTokenDto";
import { UsersTokensRepositoryProps } from "modules/users/repository/UsersTokensRepositoryProps";
import { AppSource } from "shared/infra/typeorm";

export class UsersTokensRepository implements UsersTokensRepositoryProps {
  private usersTokens: Repository<UserTokens>;

  constructor() {
    this.usersTokens = AppSource.getRepository(UserTokens);
  }

  async create(createUserToken: CreateUserTokenDto): Promise<UserTokens> {
    const userToken = this.usersTokens.create(createUserToken);
    await this.usersTokens.save(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | null> {
    return await this.usersTokens.findOneBy({ user_id, refresh_token });
  }

  async findByUserIdAndToken(
    user_id: string,
    token: string
  ): Promise<UserTokens | null> {
    return await this.usersTokens.findOneBy({ user_id, token });
  }

  async findByUserId(user_id: string): Promise<UserTokens | null> {
    return await this.usersTokens.findOneBy({ user_id });
  }

  async findByToken(token: string): Promise<UserTokens | null> {
    return await this.usersTokens.findOneBy({ token });
  }

  async updateToken(
    updateUserTokenDto: UpdateUserTokenDto
  ): Promise<UserTokens> {
    return await this.usersTokens.save(updateUserTokenDto);
  }

  async deleteToken(userToken: UserTokens): Promise<UserTokens> {
    return await this.usersTokens.remove(userToken);
  }
}
