import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompaniesTable1689177021893 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "companies",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "acronym",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnpj",
            type: "varchar",
          },
          {
            name: "phoneNumber",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("companies");
  }
}
