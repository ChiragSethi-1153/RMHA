import { Injectable } from '@nestjs/common';
import { BillingInboxMessage } from 'src/billing/domain/inbox/inbox-message.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InboxMessagePayload } from '../../message-bus/rabbitmq/rabbitmq.interface';

@Injectable()
export class InboxMessageRepository extends Repository<BillingInboxMessage> {
  constructor(dataSource: DataSource) {
    super(BillingInboxMessage, dataSource.createEntityManager());
  }

  async storeInboxMessage(
    payload: InboxMessagePayload,
    transaction: EntityManager = null,
  ) {
    if (transaction) {
      return await transaction.save(BillingInboxMessage, payload);
    }
    return await this.save(payload);
  }

  async getDuplicateInboxMessage(message_id: string, handler_name: string) {
    const criteria = { message_id, handler_name };
    return await this.findOne({ where: criteria });
  }
}