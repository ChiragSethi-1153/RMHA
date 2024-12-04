import { Module } from '@nestjs/common';
import { OrderRepository } from 'src/sales/infrastructure/repositories/orders/order.repository';
import { GetOrdersHandler } from './get-order.service';
import { GetOrderController } from './get-order.controller';

@Module({
  controllers: [GetOrderController],
  providers: [
    GetOrdersHandler,
    OrderRepository,
  ],
})
export class GetOrdersModule {}
