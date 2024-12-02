import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingAccountRepository } from 'src/billing/infrastructure/repositories/billing-accounts/billing-accounts.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class FetchBillingAccountHandler {
  constructor(
    @InjectRepository(BillingAccountRepository)
    private readonly repository: BillingAccountRepository,
  ) {}

  public async getBillingAccounts() {
    return await this.repository.getBillingAccounts();
  }
  public async getBillingAccountsById(id: string, transaction: EntityManager = null) {
    const account = await this.repository.getOneBillingAccount(id, transaction)
    let parsedAccount = {
        ...account,
        balance: Number(account.balance)
    }

    return parsedAccount;
  }
}
