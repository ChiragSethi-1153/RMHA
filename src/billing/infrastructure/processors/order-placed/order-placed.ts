import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/billing/infrastructure/repositories/inbox-message/inbox-message.repository';
import { DataSource } from 'typeorm';
import { OrderRepository } from '../../repositories/order/order.repository';
import { BillingAccountRepository } from '../../repositories/billing-accounts/billing-accounts.repository';
import { OutboxMessageRepository } from '../../repositories/outbox-message/outbox-message.repository';
import { PaymentFailed } from 'src/billing/domain/orders/events/payment-failed';
import { OrderBilled } from 'src/billing/domain/orders/events/order-billed';
export class OrderPlacedProcessor {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource,

        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,

        @InjectRepository(BillingAccountRepository)
        private billingAccountRepository: BillingAccountRepository,

        @InjectRepository(OutboxMessageRepository)
        private outboxMessageRepository: OutboxMessageRepository,

        @InjectRepository(InboxMessageRepository)
        private inboxMessageRepository: InboxMessageRepository,
    ) { }

    getHandlerName(): string {
        return this.constructor.name;
    }

    async handleEvent(payload: any) {
        await this.dataSource.transaction(async (transaction) => {
            console.log('payload: ', payload);
            const message = payload.body?.data;
            console.log('message: ', message);

            const order = await this.orderRepository.getOrderById(message?.order_id, transaction);
            console.log('order: ', order);

            const billingAccount = await this.billingAccountRepository.getOneBillingAccount(order.billing_account_id, transaction);
            console.log('billingAccount: ', billingAccount);

            const billingAccountBalance = Number(billingAccount.balance);
            console.log('billingAccountBalance: ', billingAccountBalance);
            const totalAmount = Number(message.total_amount);
            console.log('totalAmount: ', totalAmount);


            if (billingAccountBalance < totalAmount) {
                await this.outboxMessageRepository.storeOutboxMessage(
                    new PaymentFailed({ order_id: order.order_id }), transaction
                );
            }
            else {
                await this.outboxMessageRepository.storeOutboxMessage(
                    new OrderBilled({ order_id: order.order_id, total_amount: message.total_amount }), transaction
                );

                await this.billingAccountRepository.updateBillingAccount(
                    {
                        billing_account_id: billingAccount.billing_account_id,
                        balance: billingAccountBalance - totalAmount,
                    },
                    transaction,
                );
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
