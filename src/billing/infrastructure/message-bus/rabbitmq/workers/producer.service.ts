import { Injectable } from '@nestjs/common';
import { RabbitmqConnectionService } from '../config/rabbitmq-connection.service';
import { ConfigType, RabbitMQPublishMessage } from '../rabbitmq.interface';
import { OutboxMessageRepository } from 'src/sales/infrastructure/repositories/outbox-message/outbox-message.repository';
import { RabbitmqConfigurerService } from '../config/rabbitmq-configurer.service';
import { OutboxMessage } from 'src/sales/domain/outbox/outbox-message.entity';

@Injectable()
export class ProducerService {
  private connection: RabbitmqConnectionService;
  private config: ConfigType;

  constructor(
    private readonly rabbitmqConfigurerService: RabbitmqConfigurerService,
    private readonly rabbitmqConnectionService: RabbitmqConnectionService,
    private readonly outboxMessageRepository: OutboxMessageRepository,
  ) {
    this.connection = this.rabbitmqConnectionService;
    this.config = this.connection.getConnectionConfiguration();
  }

  private async connect() {
    await this.connection.connect();
    await this.rabbitmqConfigurerService.configure();
  }

  async close() {
    await this.connection.closeChannel();
  }

  async publisher(outboxMessage: OutboxMessage) {
    try {
      const message = outboxMessage.body;
      const properties = outboxMessage.properties;
      const messageToPublish: RabbitMQPublishMessage = {
        exchange: this.config.fanoutExchange,
        bindingKey: '',
        content: JSON.stringify(message),
        properties: { ...properties, persistent: true },
      };

      const isPublished = await this.connection.publish(messageToPublish);
      if (!isPublished) throw new Error('Message could not be published.');

      outboxMessage.markAsSent();

      await this.outboxMessageRepository.save(outboxMessage);
    } catch (error) {
      console.log(
        `Error while publishing message ${outboxMessage.type} with id ${outboxMessage.message_id}`,
        error,
      );
    }
  }

  async publishMessages(messages: OutboxMessage[]) {
    await this.connect();

    for (const message of messages) {
      await this.publisher(message);
    }

    await this.close();
  }
}
