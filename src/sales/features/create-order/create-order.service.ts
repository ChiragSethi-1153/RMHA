import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/sales/infrastructure/repositories/orders/order.repository';

import { ProductRepository } from 'src/sales/infrastructure/repositories/product/product.repository';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly repository: OrderRepository,

    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(orderData: CreateOrderCommand) {
    console.log(orderData);

    let total = 0;
    await Promise.all(
      orderData.products.map(async (product) => {
        const productData = await this.productRepository.getProduct(
          product.product_id,
        );
        console.log('productData: ', productData);

        if (productData) {
          total += productData?.price * product.quantity;
          console.log('total: ', total);
        } else {
          throw new Error('Product does not exist');
        }
      }),
    );
    await this.repository.storeOrder({
      total_amount: total,
      products: orderData.products,
      customer_id: orderData.customer_id,
      order_id: orderData.order_id,
    });
    return { message: 'Order created successfully' };
  }
}
