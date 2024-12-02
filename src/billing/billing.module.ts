import { Module } from '@nestjs/common';
import { CreateOrderModule } from './features/create-order/create-order.module';
import { FetchBillingAccountModule } from './features/fetch-billing-accounts/fetch-billing-accounts.module';
import { GetOrderModule } from './features/get-order/get-order.module';

@Module({
  imports: [CreateOrderModule, FetchBillingAccountModule, GetOrderModule],
})
export class BillingModule {}
