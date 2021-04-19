import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class questions1618744190932 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid' },
          { name: 'userId', type: 'uuid' },
          { name: 'title', type: 'varchar' },
          { name: 'question', type: 'varchar' },
          { name: 'createdAt', type: 'timestamp', default: 'now()', isNullable: true },
          { name: 'updatedAt', type: 'timestamp', default: 'now()', isNullable: true },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questions');
  }

}
