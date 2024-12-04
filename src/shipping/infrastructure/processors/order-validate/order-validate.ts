import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/shipping/infrastructure/repositories/inbox-message/inbox-message.repository';
import { DataSource } from 'typeorm';
import { OrderRepository } from '../../repositories/order/order.repository';
import { ProductRepository } from '../../repositories/product/product.repository';
import { OutboxMessageRepository } from '../../repositories/outbox-message/outbox-message.repository';
import { BackOrdered } from 'src/shipping/domain/order/events/back-ordered';
import { ShippingLabelCreated } from 'src/shipping/domain/order/events/shipping-label-created';
import { ShippingLabelRepository } from '../../repositories/shipping-label/shipping-label.repository';


export class HandleOrderValidate {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource,

        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,

        @InjectRepository(InboxMessageRepository)
        private inboxMessageRepository: InboxMessageRepository,

        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,

        @InjectRepository(ShippingLabelRepository)
        private shippingLabelRepository: ShippingLabelRepository,

        @InjectRepository(OutboxMessageRepository)
        private outboxMessageRepository: OutboxMessageRepository,
    ) { }

    getHandlerName(): string {
        return this.constructor.name;
    }

    async handleEvent(payload: any) {
        await this.dataSource.transaction(async (transaction) => {
            
            const message = payload.body?.data;
            const order = await this.orderRepository.getOrderById(message.orderId, transaction);

            if (order.isBilled && order.isPlaced) {

                for (const product of order.products) {
                    const productEntity = await this.productRepository.getProductById(product.product_id, transaction);

                    const productQuantity = Number(product.quantity);
                    const productQuantityOnHand = Number(productEntity.quantity_on_hand);

                    if (productQuantityOnHand < productQuantity) {
                        await this.outboxMessageRepository.storeOutboxMessage(new BackOrdered({
                            order_id: order.order_id,
                            total_amount: message.total_amount,
                        }), transaction);
                    } else {

                        await this.productRepository.updateProduct(product.product_id, {
                            quantity_on_hand: productQuantityOnHand - productQuantity,
                        }, transaction);

                        await this.shippingLabelRepository.store({
                            order_id: order.order_id
                        }, transaction);

                        console.log('===========================Shipping label created=====================');

                        await this.outboxMessageRepository.storeOutboxMessage(new ShippingLabelCreated({
                            order_id: order.order_id
                        }), transaction);

                    }
                }
            }

            await this.inboxMessageRepository.storeInboxMessage(
                {
                    message_id: payload.messageId,
                    handler_name: this.getHandlerName(),
                },
                transaction,
            );
        });
    }
}
