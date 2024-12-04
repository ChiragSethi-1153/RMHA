import { Module } from '@nestjs/common';
import { CreateOrderController } from './create-order.controller';
import { CreateOrderHandler } from './create-order.service';
import { OrderRepository } from 'src/sales/infrastructure/repositories/orders/order.repository';
import { OutboxMessageRepository } from 'src/sales/infrastructure/repositories/outbox-message/outbox-message.repository';
import { ProductRepository } from 'src/sales/infrastructure/repositories/product/product.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';

@Module({
  imports: [CqrsModule],
  controllers: [CreateOrderController],
  providers: [
    CreateOrderHandler,
    CreateOrderCommand,
    OrderRepository,
    OutboxMessageRepository,
    ProductRepository,
  ],
})
export class CreateOrderModule {}
