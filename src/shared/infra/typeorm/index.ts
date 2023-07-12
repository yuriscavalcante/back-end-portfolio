import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { Signale } from "signale";
import { MainSeeder } from "./seeds/MainSeeder";

config();

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  seeds: [MainSeeder],
};

export const AppSource = new DataSource(options);

export const InitializeConnection = async () => {
  const log = new Signale();
  const host = process.env.DB_HOST;
  const database = process.env.DB_DATABASE;

  try {
    await AppSource.setOptions({ host, database }).initialize();
    return log.scope("DataBase").success("DataBase connected");
  } catch (err) {
    log.scope("DataBase").fatal("Database could not connect", err);
    process.exit(1);
  }
};
