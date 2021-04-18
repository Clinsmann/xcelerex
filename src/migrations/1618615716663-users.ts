import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1618615716663 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'firstName', type: 'varchar' },
          { name: 'lastName', type: 'varchar' },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar' },
          { name: 'isActivated', type: 'boolean', default: false },
          { name: 'token', type: 'varchar', isNullable: true, default: null },
          { name: 'createdAt', type: 'timestamp', default: 'now()', isNullable: true },
          { name: 'updatedAt', type: 'timestamp', default: 'now()', isNullable: true },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
