import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrderBilling1732787159858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'billing_orders',
              columns: [
                {
                  name: 'order_id',
                  type: 'uuid',
                  isPrimary: true,
                  isNullable: false,
                  isUnique: true,
                },
                {
                  name: 'billing_account_id',
                  type: 'uuid',
                  isNullable: false,
                },
                {
                  name: 'billing_address',
                  type: 'text',
                  isNullable: false,
                }
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('billing_orders');
    }

}
