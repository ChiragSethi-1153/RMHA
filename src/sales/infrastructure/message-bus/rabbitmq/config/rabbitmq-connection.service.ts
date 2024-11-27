import { Injectable } from '@nestjs/common';
import { ConfigType, QueueConfig } from '../rabbitmq.interface';
import * as amqp from 'amqplib';
import { EventEmitter } from 'stream';
import { RabbitmqConfigService } from './rabbitmq-config.service';

@Injectable()
export class RabbitmqConnectionService {
  private config: ConfigType;
  private channel: amqp.Channel;
  private connection: amqp.Connection;
  private rabbitMqEvents = new EventEmitter();
  private maxReconnectTries = 5;
  private isMaxReconnectPolicyApplied = false;
  private reconnectTries = 0;
  private timeout: NodeJS.Timeout | null;

  constructor(private readonly rabbitMQConfigService: RabbitmqConfigService) {
    const { maxReconnectTries, reconnectPolicy } =
      this.rabbitMQConfigService.getMaxReconnectTrialsData();
    this.rabbitMQConfigService.validateConfig();
    this.config = this.rabbitMQConfigService.getConfig();
    this.maxReconnectTries = reconnectPolicy ? maxReconnectTries || 5 : 0;
    this.isMaxReconnectPolicyApplied = reconnectPolicy;
    this.timeout = null;

  }
  
  getConnectionConfiguration() {
    return this.config;
  }

  async exchange(exchange: string, exchangeType: string) {
    await this.channel?.assertExchange(exchange, exchangeType, {
      durable: true,
    });
  }

  async queue(
    exchange: string,
    queue: string,
    options: QueueConfig,
    routingKey = ''
  ){
    await this.channel?.assertQueue(queue, options);
    await this.channel?.bindQueue(queue, exchange, routingKey);
  }

  async createConnection(){
    const connectionString = this.rabbitMQConfigService.getConnectionString()
    const connectionParams = this.rabbitMQConfigService.getConnectionParams();
    const data = await amqp.connect(connectionString, connectionParams);
    return data;
  }

  

}
