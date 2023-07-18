import { Users } from "../../../../modules/users/infra/typeorm/entities/Users";
import { Company } from "../../../../modules/companies/infra/typeorm/entities/Company";
import { HashProvider } from "../../../../shared/providers/HashProvider/HashProvider";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const companyRepository = dataSource.getRepository(Company);

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

    const company = {
      name: "Silva e Pelaquim Associados LTDA",
      acronym: "SPA",
      cnpj: "56.938.372/0001-1",
      phoneNumber: "(17)7065-3638",
      email: "spa@email-br.com",
    };

    for (let i = 0; i <= 55; i++) {
      const newCompany = companyRepository.create({
        name: company.name + i,
        acronym: company.acronym + i,
        cnpj: company.cnpj + i,
        phoneNumber: company.phoneNumber + i,
        email: company.email + i,
      });
      await companyRepository.save(newCompany);
    }
  }
}
