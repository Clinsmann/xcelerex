import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class comments1618782440654 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid' },
          { name: 'userId', type: 'uuid' },
          { name: 'questionId', type: 'uuid' },
          { name: 'comment', type: 'varchar' },
          { name: 'createdAt', type: 'timestamp', default: 'now()', isNullable: true },
          { name: 'updatedAt', type: 'timestamp', default: 'now()', isNullable: true },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey("comments", new TableForeignKey({
      columnNames: ["questionId"],
      referencedColumnNames: ["id"],
      referencedTableName: "questions",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comments');
  }

}
