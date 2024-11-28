import { Injectable } from '@nestjs/common';
import { Event } from 'src/sales/domain/common/event';
import { OutBoxStatus } from 'src/sales/domain/outbox/enums/status.enum';
import { OutboxMessage } from 'src/sales/domain/outbox/outbox-message.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class OutboxMessageRepository extends Repository<OutboxMessage> {
  constructor(dataSource: DataSource) {
    super(OutboxMessage, dataSource.createEntityManager());
  }

  createOutboxPayloadFromEvent = (
    outbox_message: Event,
  ): OutboxMessagePayloadType => {
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
      OutboxMessage,
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
