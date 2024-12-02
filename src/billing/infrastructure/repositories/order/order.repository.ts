import { Injectable } from '@nestjs/common';
import { OrderBilling } from 'src/billing/domain/orders/orders.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrderRepository extends Repository<OrderBilling> {
  constructor(dataSource: DataSource) {
    super(OrderBilling, dataSource.createEntityManager());
  }

  async storeOrder(payload: any, transaction: EntityManager = null) {
    if (transaction) {
      return await transaction.save(OrderBilling, payload);
    }
    return await this.save(payload);
  }

  async getOrderById(orderId: string, transaction: EntityManager = null) {
    console.log('orderId: ', orderId);
    if (transaction) {
      return await transaction.findOneBy(OrderBilling, { order_id: orderId });
    }
    return await this.findOneBy({ order_id: orderId });
  }
}
