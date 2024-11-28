import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class CreateInboxBilling1732787136983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'billing_inbox_message',
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

    await queryRunner.createUniqueConstraint(
      'billing_inbox_message',
      new TableUnique({
        name: 'billing_unique_message_handler',
        columnNames: ['message_id', 'handler_name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint(
      'billing-inbox_message',
      'billing_unique_message_handler',
    );

    await queryRunner.dropTable('billing_inbox_message');
  }
}
