import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddFieldInUsersTable1689088634536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({ name: "isAdmin", type: "boolean", default: false })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "isAdmin");
  }
}
