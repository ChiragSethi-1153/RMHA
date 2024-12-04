import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrdersTable1721202789720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shipping_order',
        columns: [
          {
            name: 'order_id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'shipping_address',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'products',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'isPlaced',
            type: 'boolean',
            default: false,
          },
          {
            name: 'isBilled',
            type: 'boolean',
            default: false,
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shipping_order');
  }
}
