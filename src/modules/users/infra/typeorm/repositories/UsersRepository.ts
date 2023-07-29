import { UsersRepositoryProps } from "modules/users/repository/UsersRepositoryProps";
import { Repository } from "typeorm";
import { Users } from "../entities/Users";
import { AppSource } from "shared/infra/typeorm";
import { CreateUsersDto } from "modules/users/dto/CreateUsersDto";

export class UsersRepository implements UsersRepositoryProps {
  private users: Repository<Users>;

  constructor() {
    this.users = AppSource.getRepository(Users);
  }
  async create(users: CreateUsersDto): Promise<Users> {
    const newUsers = await this.users.create(users);
    await this.users.save(newUsers);
    return newUsers;
  }
  async find(query: any): Promise<Users[]> {
    return await this.users.find({
      loadEagerRelations: false,
      select: {
        id: true,
        name: true,
        birthDate: true,
        company: {
          id: true,
          name: true,
          acronym: true,
        },
        email: true,
        documents: true,
        isAdmin: true,
        phoneNumber: true,
      },
      where: {
        company: {
          id: query.company,
        },
      },
      relations: {
        company: true,
      },
    });
  }
  async findByEmail(email: string): Promise<Users | null> {
    return await this.users.findOne({
      where: {
        email: email,
      },
    });
  }
  async findById(id: string): Promise<Users | null> {
    return await this.users.findOne({
      where: {
        id: id,
      },
    });
  }
  async update(users: Users): Promise<Users> {
    return await this.users.save(users);
  }
  async delete(users: Users): Promise<Users | null> {
    return await this.users.remove(users);
  }
}
