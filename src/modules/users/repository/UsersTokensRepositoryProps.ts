import { CreateUserTokenDto } from "../dto/CreateUserTokenDto";
import { UpdateUserTokenDto } from "../dto/UpdateUserTokenDto";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface UsersTokensRepositoryProps {
  create(createUserTokenDto: CreateUserTokenDto): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | null>;
  findByUserIdAndToken(
    user_id: string,
    token: string
  ): Promise<UserTokens | null>;
  findByUserId(user_id: string): Promise<UserTokens | null>;
  findByToken(token: string): Promise<UserTokens | null>;
  updateToken(updateUserTokenDto: UpdateUserTokenDto): Promise<UserTokens>;
  deleteToken(userToken: UserTokens): Promise<UserTokens>;
}
