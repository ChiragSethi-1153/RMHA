import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class CreateInboxMessageTable1723302789722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the table
    await queryRunner.createTable(
      new Table({
        name: 'shipping_inbox_message',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'message_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'handler_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'handled_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );

    // Add unique constraint
    await queryRunner.createUniqueConstraint(
      'shipping_inbox_message',
      new TableUnique({
        name: 'shipping_unique_message_handler',
        columnNames: ['message_id', 'handler_name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the unique constraint
    await queryRunner.dropUniqueConstraint('shipping_inbox_message', 'unique_message_handler');

    // Drop the table
    await queryRunner.dropTable('shipping_inbox_message');
  }
}
