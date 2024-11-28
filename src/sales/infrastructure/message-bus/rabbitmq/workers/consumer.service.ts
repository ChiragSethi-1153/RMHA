import { Injectable } from '@nestjs/common';
import { RabbitmqConnectionService } from '../config/rabbitmq-connection.service';
import { ConfigType } from '../rabbitmq.interface';
import * as amqp from 'amqplib';

@Injectable()
export class ConsumerService {
  private connection: RabbitmqConnectionService;
  private config: ConfigType;
  private channel: amqp.Channel;
  private signatureTypes: string[];
  private prefetchLimit: number;

  

}
