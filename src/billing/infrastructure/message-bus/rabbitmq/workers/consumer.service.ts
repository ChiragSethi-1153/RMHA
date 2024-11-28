import { Injectable } from '@nestjs/common';
import { RabbitmqConnectionService } from '../config/rabbitmq-connection.service';
import { ConfigType, RabbitMQConsumeMessage } from '../rabbitmq.interface';
import * as amqp from 'amqplib';
import { RabbitmqConfigurerService } from '../config/rabbitmq-configurer.service';
import { InboxMessageHandler } from '../../inbox-message-handler.service';

@Injectable()
export class ConsumerService {
  private connection: RabbitmqConnectionService;
  private config: ConfigType;
  private channel: amqp.Channel;
  private signatureTypes: string[];
  private prefetchLimit: number;

  constructor(
    private readonly rabbitmqConfigurerService: RabbitmqConfigurerService,
    private readonly rabbitmqConnectionService: RabbitmqConnectionService,
    private readonly messageHandler: InboxMessageHandler,
  ) {
    this.connection = this.rabbitmqConnectionService;
    this.config = this.connection.getConnectionConfiguration();
    this.prefetchLimit = this.config.consumeMessageLimit;
    this.signatureTypes = this.messageHandler.getSignatureTypes();
  }

  async startConsuming() {
    await this.channel.consume(
      this.config.primaryQueue,
      async (message: RabbitMQConsumeMessage) => {
        if (message === null) return;

        console.log(
          '\n\n================= NEW MESSAGE CONSUMING AT',
          new Date(),
          '=================',
        );
      },
    );
  }

  async consume(limit: number) {
    this.channel = this.connection.getChannel();
    await this.channel?.prefetch(limit || this.prefetchLimit);
    await this.startConsuming();
    console.log(`Waiting for messages in ${this.config.primaryQueue}...`);
  }

  async consumeMessage(limit: number) {
    await this.connection.connect();
    await this.rabbitmqConfigurerService.configure();
    await this.consume(limit);
  }

  hasBeenRedeliveredTooMuch(redeliveryCount: number) {
    return redeliveryCount >= this.config.delayedRetriesNumber;
  }
  
  async handleError(
    message: RabbitMQConsumeMessage,
    error: Error,
    redeliveryCount: number,
  ) {
    if (this.hasBeenRedeliveredTooMuch(redeliveryCount))
      await this.connection.deadLetter(message, error);
    else await this.connection.retry(message, error);
  }
}
