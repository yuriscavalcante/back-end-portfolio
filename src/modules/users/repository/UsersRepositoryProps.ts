import { CreateUsersDto } from "../dto/CreateUsersDto";
import { Users } from "../infra/typeorm/entities/Users";

export interface UsersRepositoryProps {
  create(users: CreateUsersDto): Promise<Users>;
  find(query: any): Promise<Users[]>;
  findByEmail(email: string): Promise<Users | null>;
  findById(id: string): Promise<Users | null>;
  update(users: Users): Promise<Users>;
  delete(users: Users): Promise<Users | null>;
}
