import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddForeignKeyInUsersTable1690239877469
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "company",
        type: "uuid",
        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        name: "FKCompany",
        referencedTableName: "companies",
        referencedColumnNames: ["id"],
        columnNames: ["company"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users", "FKCompany");
    await queryRunner.dropColumn("users", "company");
  }
}
