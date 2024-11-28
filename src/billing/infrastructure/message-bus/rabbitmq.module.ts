import { Module } from '@nestjs/common';
import { DispatchMessages } from './cli-commands/dispatch-messages';
import { RabbitmqConfigService } from './rabbitmq/config/rabbitmq-config.service';
import { RabbitmqConfigurerService } from './rabbitmq/config/rabbitmq-configurer.service';
import { RabbitmqConnectionService } from './rabbitmq/config/rabbitmq-connection.service';
import { ProducerService } from './rabbitmq/workers/producer.service';
import { OutboxMessageRepository } from '../repositories/outbox-message/outbox-message.repository';
import { OutboxMessageRelay } from './outbox-message-relay.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from 'src/common/type-orm';
import { HandleMessages } from './cli-commands/handle-messages';
import { ConsumerService } from './rabbitmq/workers/consumer.service';
import { InboxMessageHandler } from './inbox-message-handler.service';
import { SignatureTypes } from '../processors/signature-types.service';
import { InboxMessageRepository } from '../repositories/inbox-message/inbox-message.repository';
import { OrderRepository } from '../repositories/order/order.repository';
import { BillingAccountRepository } from '../repositories/billing-accounts/billing-accounts.repository';
import { OrderPlacedProcessor } from '../processors/order-placed/order-placed';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule,
  ],
  providers: [
    DispatchMessages,
    HandleMessages,
    RabbitmqConfigService,
    RabbitmqConfigurerService,
    RabbitmqConnectionService,
    ProducerService,
    OutboxMessageRepository,
    OutboxMessageRelay,
    ConsumerService,
    InboxMessageHandler,
    SignatureTypes,
    InboxMessageRepository,
    OrderRepository,
    BillingAccountRepository,
    OutboxMessageRepository,
    InboxMessageRepository,
    OrderPlacedProcessor,
  ],
})
export class RabbitmqModule {}
