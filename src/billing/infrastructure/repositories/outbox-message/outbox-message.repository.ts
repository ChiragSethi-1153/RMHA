import { Injectable } from '@nestjs/common';
import { Event } from 'src/billing/domain/common/event';
import { OutBoxStatus } from 'src/billing/domain/outbox/enums/status.enum';
import { BillingOutboxMessage } from 'src/billing/domain/outbox/outbox-message.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class OutboxMessageRepository extends Repository<BillingOutboxMessage> {
  constructor(dataSource: DataSource) {
    super(BillingOutboxMessage, dataSource.createEntityManager());
  }
  createOutboxPayloadFromEvent = (
    outbox_message: Event,
  ): BillingOutboxMessagePayloadType => {
    return {
      message_id: outbox_message.getId(),
      type: outbox_message.getType(),
      properties: outbox_message.getProperties(),
      headers: outbox_message.getHeaders(),
      body: outbox_message.getPayload(),
    };
  };

  async storeOutboxMessage(
    outbox_message: Event,
    transactionalEntityManager: EntityManager,
  ) {
    return await transactionalEntityManager.save(
        BillingOutboxMessage,
      this.createOutboxPayloadFromEvent(outbox_message),
    );
  }

  async getUnsentMessages(limit: number) {
    const [data, total] = await this.findAndCount({
      where: { status: OutBoxStatus.PENDING },
      take: limit,
    });
    return { data, total };
  }
}
