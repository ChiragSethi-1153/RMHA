import { Controller, Get, Param } from '@nestjs/common';
import { FetchBillingAccountHandler } from './fetch-billing-accounts.service';
import { BillingAccount } from 'src/billing/domain/billing-account/billing-account.entity';

@Controller('api/v1/billing/accounts')
export class FetchBillingAccountController {
  constructor(private readonly handler: FetchBillingAccountHandler) {}

  @Get('/')
  async getBillingAccounts(): Promise<BillingAccount[]> {
    return await this.handler.getBillingAccounts();
  }

  @Get('/:id')
  async getBillingAccountById(@Param('id') id: string) {
    return await this.handler.getBillingAccountsById(id);
  }
}
