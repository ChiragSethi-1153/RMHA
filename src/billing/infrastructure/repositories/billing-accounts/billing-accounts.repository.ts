import { Injectable } from '@nestjs/common';
import { BillingAccount } from 'src/billing/domain/billing-account/billing-account.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class BillingAccountRepository extends Repository<BillingAccount> {
  constructor(dataSource: DataSource) {
    super(BillingAccount, dataSource.createEntityManager());
  }

  async storeBillingAccount(payload: any, transaction: EntityManager = null) {
    if (transaction) {
      return await transaction.save(BillingAccount, payload);
    }

    return await this.save(payload);
  }

  async getOneBillingAccount(
    billingAccountId: string,
    transaction: EntityManager = null,
  ) {
    if (transaction) {
      return await transaction.findOneBy(BillingAccount, {
        billing_account_id: billingAccountId,
      });
    }
    const billingAccount = await this.findOne({
      where: { billing_account_id: billingAccountId },
    });
    return billingAccount;
  }
  async getBillingAccounts(): Promise<BillingAccount[]> {
    const billingAccount = await this.find();
    return billingAccount;
  }

  async updateBillingAccount(payload: any, transaction: EntityManager = null) {
    if (transaction) {
      return await transaction.update(
        BillingAccount,
        { billing_account_id: payload.billing_account_id },
        {
          balance: payload.balance,
        },
      );
    }

    return await this.update(
      { billing_account_id: payload.billing_account_id },
      {
        balance: payload.balance,
      },
    );
  }
}
