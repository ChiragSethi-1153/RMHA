import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderSales1732693476206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "order_status_enum" AS ENUM ('PENDING', 'PLACED', 'BILLED', 'PAYMENT_FAILED','READY_TO_SHIP','CANCELLED')
            `);

    await queryRunner.createTable(
      new Table({
        name: 'sales_order',
        columns: [
            {
              name: 'order_id',
              type: 'uuid',
              isPrimary: true,
              isNullable: false,
              isUnique: true,
            },
            {
              name: 'products',
              type: 'jsonb',
              isNullable: false,
            },
            {
              name: 'customer_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'total_amount',
              type: 'decimal',
              isNullable: false,
            },
            {
              name: 'status',
              type: 'enum',
              enumName: 'order_status_enum',
              default: "'PENDING'",
              isNullable: false,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
              isNullable: false,
            },
          ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales_order')
  }
}
