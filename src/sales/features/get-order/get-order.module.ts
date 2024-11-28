import { Module } from '@nestjs/common';
import { OrderRepository } from 'src/sales/infrastructure/repositories/orders/order.repository';
import { GetOrdersHandler } from './get-order.service';

@Module({
  controllers: [],
  providers: [
    GetOrdersHandler,
    OrderRepository,
  ],
})
export class GetOrdersModule {}
