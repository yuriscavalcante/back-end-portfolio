export interface UpdateUserTokenDto {
  id: string;
  user_id: string;
  token: string;
  refresh_token?: string;
  expireAt: Date;
}
