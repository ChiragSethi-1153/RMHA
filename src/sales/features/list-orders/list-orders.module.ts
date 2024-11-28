import { Module } from '@nestjs/common';
import { OrderRepository } from 'src/sales/infrastructure/repositories/orders/order.repository';
import { ListOrdersHandler } from './list-orders.service';
import { ListOrdersController } from './list-orders.controller';

@Module({
  controllers: [ListOrdersController],
  providers: [
    ListOrdersHandler,
    OrderRepository,
  ],
})
export class ListOrdersModule {}
