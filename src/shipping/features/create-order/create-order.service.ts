import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/shipping/infrastructure/repositories/order/order.repository';
import { CreateOrderCommand } from './create-order.dto';

@Injectable()
export class CreateOrderHandler {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly repository: OrderRepository,
  ) {}

  public async handle(data: any) {
    console.log(data);
    await this.repository.storeOrder(data);
    return { message: 'Shipping Order created successfully' };
  }
}
