// import { Injectable } from '@nestjs/common';
// import { InboxMessage } from 'src/sales/domain/inbox/inbox-message.entity';
// import { DataSource, EntityManager, Repository } from 'typeorm';mq.interface';

// @Injectable()
// export class InboxMessageRepository extends Repository<InboxMessage> {
//   constructor(dataSource: DataSource) {
//     super(InboxMessage, dataSource.createEntityManager());
//   }

//   async storeInboxMessage(
//     payload: InboxMessagePayload,
//     transaction: EntityManager = null,
//   ) {
//     if (transaction) {
//       return await transaction.save(InboxMessage, payload);
//     }
//     return await this.save(payload);
//   }

//   async getDuplicateInboxMessage(message_id: string, handler_name: string) {
//     const criteria = { message_id, handler_name };
//     return await this.findOne({ where: criteria });
//   }
// }
