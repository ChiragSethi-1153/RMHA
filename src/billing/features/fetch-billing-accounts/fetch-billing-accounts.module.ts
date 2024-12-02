import { Module } from '@nestjs/common';
import { FetchBillingAccountController } from './fetch-billing-accounts.controller';
import { FetchBillingAccountHandler } from './fetch-billing-accounts.service';
import { BillingAccountRepository } from 'src/billing/infrastructure/repositories/billing-accounts/billing-accounts.repository';

@Module({
  controllers: [FetchBillingAccountController],
  providers: [FetchBillingAccountHandler, BillingAccountRepository],
})
export class FetchBillingAccountModule {}
