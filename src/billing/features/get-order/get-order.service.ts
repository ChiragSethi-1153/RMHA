import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingAccountRepository } from 'src/billing/infrastructure/repositories/billing-accounts/billing-accounts.repository';
import { OrderRepository } from 'src/billing/infrastructure/repositories/order/order.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class GetOrderHandler {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly repository: OrderRepository,
  ) {}

  public async handle(id: string, transaction: EntityManager = null) {
    return await this.repository.getOrderById(id, transaction);
  }
}
