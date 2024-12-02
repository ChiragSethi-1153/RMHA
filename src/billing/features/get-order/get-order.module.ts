import { Module } from '@nestjs/common';
import { GetOrderController } from './get-order.controller';
import { GetOrderHandler } from './get-order.service';
import { OrderRepository } from 'src/billing/infrastructure/repositories/order/order.repository';

@Module({
  controllers: [GetOrderController],
  providers: [GetOrderHandler, OrderRepository],
})
export class GetOrderModule {}
