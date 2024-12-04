import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OutboxMessageRepository } from 'src/shipping/infrastructure/repositories/outbox-message/outbox-message.repository';
import { OutboxMessageRelay } from './outbox-message-relay.service';
import { ProducerService } from './rabbitmq/workers/producer.service';
import { RabbitmqConfigService } from './rabbitmq/config/rabbitmq-config.service';
import { InboxMessageRepository } from 'src/shipping/infrastructure/repositories/inbox-message/inbox-message.repository';
import { InboxMessageHandler } from './inbox-message-handler.service';
import { SignatureTypes } from 'src/shipping/infrastructure/processors/signature-types.service';
import { ConsumerService } from './rabbitmq/workers/consumer.service';
import { DispatchMessages } from './cli-commands/dispatch-messages';
import { HandleMessages } from './cli-commands/handle-messages';
import { RabbitmqConfigurerService } from './rabbitmq/config/rabbitmq-configurer.service';
import { RabbitmqConnectionService } from './rabbitmq/config/rabbitmq-connection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/common/ormconfig';
import { HandleOrderBilled } from '../processors/order-billed/order-billed';
import { OrderRepository } from '../repositories/order/order.repository';
import { ProductRepository } from '../repositories/product/product.repository';
import { HandleOrderPlaced } from '../processors/order-placed/oder-placed';
import { ShippingLabelRepository } from '../repositories/shipping-label/shipping-label.repository';
import { HandleOrderValidate } from '../processors/order-validate/order-validate';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => dataSourceOptions(configService),
      inject: [ConfigService],
    }),
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
    ProductRepository,
    ShippingLabelRepository,
    HandleOrderBilled,
    HandleOrderPlaced,
    HandleOrderValidate,
  ],
})
export class RabbitmqModule {}
