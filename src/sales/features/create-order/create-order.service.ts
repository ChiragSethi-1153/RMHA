import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/sales/infrastructure/repositories/orders/order.repository';
import { CreateOrderCommand } from './create-order.dto';
import { ProductRepository } from 'src/sales/infrastructure/repositories/product/product.repository';

@Injectable()
export class CreateOrderHandler {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly repository: OrderRepository,

    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async handle(orderData: CreateOrderPayload) {

    const productsWithParsedQuantity = orderData.products.map((product) => ({
      ...product,
      quantity: Number(product.quantity),
    }));

    let total = 0;
    await Promise.all(
      productsWithParsedQuantity.map(async (product) => {
        const productData = await this.productRepository.getProduct(
          product.product_id,
        );
        total += productData?.price * product.quantity;
      }),
    );
    await this.repository.storeOrder({
      total_amount: total,
      products: productsWithParsedQuantity,
      customer_id: orderData.customer_id,
      order_id: orderData.order_id,
    });
    return { message: 'Order created successfully' };
  }
}
