export interface CreateUserTokenDto {
  user_id: string;
  token: string;
  refresh_token?: string;
  expireAt: Date;
}
