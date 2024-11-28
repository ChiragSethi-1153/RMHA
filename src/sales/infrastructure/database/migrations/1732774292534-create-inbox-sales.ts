import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class CreateInboxSales1732774292534 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
              name: 'sales_inbox_message',
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
            'sales_inbox_message',
            new TableUnique({
              name: 'sales_unique_message_handler',
              columnNames: ['message_id', 'handler_name'],
            }),
          );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint('sales_inbox_message', 'sales_unique_message_handler');
        await queryRunner.dropTable('sales_inbox_message');
    }

}
