import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductsTable1721202789721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shipping_product',
        columns: [
          {
            name: 'product_id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'quantity_on_hand',
            type: 'integer',
            isNullable: false,
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shipping_product');
  }
}
