import { Injectable } from '@nestjs/common';
import { OrderShipping } from 'src/shipping/domain/order/order.entity';
import { CreateOrderCommand } from 'src/shipping/features/create-order/create-order.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrderRepository extends Repository<OrderShipping> {
  constructor(dataSource: DataSource) {
    super(OrderShipping, dataSource.createEntityManager());
  }

  async storeOrder(payload: CreateOrderCommand, transaction: EntityManager = null) {
    if (transaction) {
      return await transaction.save(OrderShipping, payload);
    }
    return await this.save(payload);
  }

  async getOrderById(orderId: string, transaction: EntityManager = null) {
    if (transaction) {
      return await transaction.findOneBy(OrderShipping, { order_id: orderId });
    }
    return await this.findOneBy({
      order_id: orderId,
    });
  }

  async updateOrder(
    payload: { isPlaced?: boolean , isBilled?: boolean },
    orderId: string,
    transaction: EntityManager = null
  ) {

    if (transaction) {
      return await transaction.update(OrderShipping, orderId, payload);
    }

    return await this.update(orderId, payload);

  }


}
