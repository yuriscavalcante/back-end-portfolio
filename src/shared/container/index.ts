import { UsersRepository } from "modules/users/infra/typeorm/repositories/UsersRepository";
import { UsersRepositoryProps } from "modules/users/repository/UsersRepositoryProps";
import { HashProvider } from "shared/providers/HashProvider/HashProvider";
import { HashProviderProps } from "shared/providers/HashProvider/HashProviderProps";
import { container } from "tsyringe";

container.registerSingleton<UsersRepositoryProps>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<HashProviderProps>("HashProvider", HashProvider);
