import { Injectable } from '@nestjs/common';
import { Order } from 'src/sales/domain/order/order.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async storeOrder(
    payload: CreateOrderPayload,
    transaction: EntityManager = null
  ) {

    if(transaction){
        return await transaction.save(Order, payload)
    }
    
    await this.save(payload)
  }

  async getOrderById(orderId: string) {
    return await this.findOneBy({ order_id: orderId });
  }

  async listOrders() {
    return await this.find();
  }

  async updateOrder(
    payload: any,
    orderId: string,
    transaction: EntityManager = null
  ) {
    if(transaction) {
      return await transaction.update(Order, orderId, payload);
    }
    return await this.update(orderId, payload);
  }


}
