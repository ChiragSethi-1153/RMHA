import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBillingAccounts1732787174884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'billing_account',
              columns: [
                {
                  name: 'billing_account_id',
                  type: 'uuid',
                  isPrimary: true,
                  isNullable: false,
                  isUnique: true,
                },
                {
                  name: 'balance',
                  type: 'decimal',
                  isNullable: false,
                },
                {
                  name: 'card_number',
                  type: 'varchar',
                  length: '16',
                  isNullable: false,
                }
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('billing_accounts');
    }

}
