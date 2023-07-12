import { UsersTokensRepository } from "../../modules/users/infra/typeorm/repositories/UsersTokensRepository";
import { UsersTokensRepositoryProps } from "../../modules/users/repository/UsersTokensRepositoryProps";
import { UsersRepository } from "../../modules/users/infra/typeorm/repositories/UsersRepository";
import { UsersRepositoryProps } from "../../modules/users/repository/UsersRepositoryProps";
import { HashProvider } from "../../shared/providers/HashProvider/HashProvider";
import { HashProviderProps } from "../../shared/providers/HashProvider/HashProviderProps";
import { container } from "tsyringe";
import { DateProviderProps } from "../../shared/providers/DateProvider/DateProviderProps";
import { DateProvider } from "../../shared/providers/DateProvider/DateProvider";
import { CompanyRepositoryProps } from "../../modules/companies/repositories/CompanyRepositoryProps";
import { CompanyRepository } from "../../modules/companies/infra/typeorm/repositories/CompanyRepository";

container.registerSingleton<UsersRepositoryProps>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<HashProviderProps>("HashProvider", HashProvider);
container.registerSingleton<UsersTokensRepositoryProps>(
  "UsersTokensRepository",
  UsersTokensRepository
);
container.registerSingleton<DateProviderProps>("DateProvider", DateProvider);
container.registerSingleton<CompanyRepositoryProps>(
  "CompanyRepository",
  CompanyRepository
);
