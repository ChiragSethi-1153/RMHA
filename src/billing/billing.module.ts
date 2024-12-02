import { Module } from '@nestjs/common';
import { CreateOrderModule } from './features/create-order/create-order.module';
import { FetchBillingAccountModule } from './features/fetch-billing-accounts/fetch-billing-accounts.module';

@Module({
  imports: [CreateOrderModule, FetchBillingAccountModule],
})
export class BillingModule {}
