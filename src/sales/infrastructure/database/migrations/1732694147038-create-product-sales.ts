import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductSales1732694147038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'sales_product',
              columns: [
                {
                  name: 'product_id',
                  type: 'uuid',
                  isPrimary: true,
                  isNullable: false,
                  isUnique: true,
                },
                {
                  name: 'price',
                  type: 'float',
                  isNullable: false,
                }
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sales_product');
    }
}
