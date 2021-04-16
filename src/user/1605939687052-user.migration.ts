import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration1605939687052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_entity',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'firstName', type: 'varchar' },
          { name: 'lastName', type: 'varchar' },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'country', type: 'varchar' },
          { name: 'role', type: 'varchar' },
          { name: 'jobTitle', type: 'varchar', isNullable: true },
          { name: 'institution', type: 'varchar', isNullable: true },
          { name: 'password', type: 'varchar' },
          { name: 'profileImage', type: 'varchar', isNullable: true },
          { name: 'agreeToTerms', type: 'boolean' },
          { name: 'getUpdates', type: 'boolean', isNullable: true },
          { name: 'isActivated', type: 'boolean', default: false },
          { name: 'token', type: 'varchar', isNullable: true, default: null },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_entity');
  }
}
