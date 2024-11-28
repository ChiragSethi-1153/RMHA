import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from 'src/sales/domain/order/enums/status-enum';
import { OrderPlaced } from 'src/sales/domain/order/event/order-placed';
import { OrderRepository } from 'src/sales/infrastructure/repositories/orders/order.repository';
import { OutboxMessageRepository } from 'src/sales/infrastructure/repositories/outbox-message/outbox-message.repository';
import { DataSource } from 'typeorm';
import { GetOrdersHandler } from '../get-order/get-order.service';

@Injectable()
export class PlaceOrderHandler {

    constructor(
        private orderHandler: GetOrdersHandler,
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,
        @InjectRepository(OutboxMessageRepository)
        private outboxMessageRepository: OutboxMessageRepository,
        private dataSource: DataSource
    ) { }

    public async handle(order_id: string) {
        return await this.dataSource.transaction(async transactionalEntityManager => {
            await this.orderRepository.updateOrder({ status: OrderStatus.PLACED }, order_id, transactionalEntityManager);
            const product = await this.orderHandler.handle(order_id);
            console.log(product)
            await this.outboxMessageRepository
                .storeOutboxMessage(new OrderPlaced(product),
                    transactionalEntityManager);
            return { message: 'Order placed successfully' };
        });

    }
}
