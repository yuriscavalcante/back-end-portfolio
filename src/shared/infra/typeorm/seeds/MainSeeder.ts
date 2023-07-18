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
    const [list, total] = await companyRepository.findAndCount();

    let i = 0;
    const company = [
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
      {
        name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "56.938.372/0001-1",
        phoneNumber: "(17)7065-3638",
        email: "spa@email-br.com",
      },
    ];
    for (let c of company) {
      Object.assign(c, {
        name: c.name + (total + i),
        acronym: c.acronym + (total + i),
        cnpj: c.cnpj + (total + i),
      });
      const newCompany = companyRepository.create(c);
      await companyRepository.save(newCompany);
      i++;
    }
  }
}
