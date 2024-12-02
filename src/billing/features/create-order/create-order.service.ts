import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderCommand } from './create-order.dto';
import { OrderRepository } from 'src/billing/infrastructure/repositories/order/order.repository';

@Injectable()
export class CreateOrderHandler {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly repository: OrderRepository,
  ) {}

  public async handle(data: CreateOrderCommand) {
    await this.repository.storeOrder(data);
    return { message: 'Order created successfully' };
  }
}
