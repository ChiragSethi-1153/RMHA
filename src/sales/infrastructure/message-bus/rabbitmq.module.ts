import { Module } from '@nestjs/common';
import { OrderRepository } from '../repositories/orders/order.repository';
import { DispatchMessages } from './cli-commands/dispatch-messages';
import { RabbitmqConfigService } from './rabbitmq/config/rabbitmq-config.service';
import { RabbitmqConfigurerService } from './rabbitmq/config/rabbitmq-configurer.service';
import { RabbitmqConnectionService } from './rabbitmq/config/rabbitmq-connection.service';
import { ProducerService } from './rabbitmq/workers/producer.service';
import { OutboxMessageRepository } from '../repositories/outbox-message/outbox-message.repository';
import { OutboxMessageRelay } from './outbox-message-handler.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '../../../common/type-orm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule,
  ],
  providers: [
    DispatchMessages,
    RabbitmqConfigService,
    RabbitmqConfigurerService,
    RabbitmqConnectionService,
    ProducerService,
    OutboxMessageRepository,
    OutboxMessageRelay,
  ],
})
export class RabbitmqModule {}
