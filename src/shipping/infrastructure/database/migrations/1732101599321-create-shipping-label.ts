import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateShippingLabelTable1721202789724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the `shipping_label` table
    await queryRunner.createTable(
      new Table({
        name: 'shipping_label',
        columns: [
          {
            name: 'order_id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the `shipping_label` table
    await queryRunner.dropTable('shipping_label');
  }
}
