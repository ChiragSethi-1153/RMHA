import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/shipping/infrastructure/repositories/inbox-message/inbox-message.repository';
import { DataSource } from 'typeorm';
import { OrderRepository } from '../../repositories/order/order.repository';
import { ProductRepository } from '../../repositories/product/product.repository';
import { OutboxMessageRepository } from '../../repositories/outbox-message/outbox-message.repository';
import { BackOrdered } from 'src/shipping/domain/order/events/back-ordered';


export class HandleOrderPlaced {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource,

        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,

        @InjectRepository(InboxMessageRepository)
        private inboxMessageRepository: InboxMessageRepository
    ) { }

    getHandlerName(): string {
        return this.constructor.name;
    }

    async handleEvent(payload: any) {
        await this.dataSource.transaction(async (transaction) => {
            const message = payload.body?.data;
            await this.orderRepository.updateOrder(
                { isPlaced: true },
                message.order_id,
                transaction
            )

            await this.inboxMessageRepository.storeInboxMessage(
                {
                    message_id: payload?.messageId,
                    handler_name: this.getHandlerName(),
                },
                transaction,
            );
        });
    }
}
