import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { OrderRepository } from "../../repositories/order/order.repository";
import { BillingAccountRepository } from "../../repositories/billing-accounts/billing-accounts.repository";
import { OutboxMessageRepository } from "../../repositories/outbox-message/outbox-message.repository";
import { InboxMessageRepository } from "../../repositories/inbox-message/inbox-message.repository";
import { PaymentFailed } from "src/billing/domain/orders/events/payment-failed";
import { OrderBilled } from "src/billing/domain/orders/events/order-billed";

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
    ){}

    getHandlerName(): string {
        return this.constructor.name;
    }

    async handleEvent(payload: any){
        await this.dataSource.transaction(async (transaction) => {
            const message = payload.body?.data
            const order = await this.orderRepository.getOrderById(message?.order_id, transaction)
            const billingAccount = await this.billingAccountRepository.getOneBillingAccount(order.billing_account_id, transaction)

            if(billingAccount.balance < payload.total_amount) {
                await this.outboxMessageRepository.storeOutboxMessage(
                    new PaymentFailed({order_id: order.order_id}), transaction
                )
            }
            else{
                await this.outboxMessageRepository.storeOutboxMessage(
                    new OrderBilled({ order_id: order.order_id }), transaction
                );

                await this.billingAccountRepository.updateBillingAccount(
                    {
                        billing_account_id: billingAccount.billing_account_id,
                        balance: billingAccount.balance - payload.total_amount,
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
        })
    }


}