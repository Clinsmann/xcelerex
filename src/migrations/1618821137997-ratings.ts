import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ratings1618821137997 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ratings',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid' },
          { name: 'userId', type: 'uuid' },
          { name: 'questionId', type: 'uuid' },
          { name: 'rating', type: 'boolean' },
          { name: 'createdAt', type: 'timestamp', default: 'now()', isNullable: true },
          { name: 'updatedAt', type: 'timestamp', default: 'now()', isNullable: true },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey("ratings", new TableForeignKey({
      columnNames: ["questionId"],
      referencedColumnNames: ["id"],
      referencedTableName: "questions",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ratings');
  }

}
