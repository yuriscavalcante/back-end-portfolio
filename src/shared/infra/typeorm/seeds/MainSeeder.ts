import { Users } from "../../../../modules/users/infra/typeorm/entities/Users";
import { HashProvider } from "../../../../shared/providers/HashProvider/HashProvider";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const usersRepository = dataSource.getRepository(Users);
    const hash = new HashProvider();
    const user = {
      name: "Root",
      email: "root@email.com",
      isAdmin: true,
      password: await hash.hash("12345678"),
    };
    const newUser = usersRepository.create(user);
    await usersRepository.save(newUser);
  }
}
