import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/sales/infrastructure/repositories/orders/order.repository';

@Injectable()
export class GetOrdersHandler {

    constructor(
        @InjectRepository(OrderRepository)
        private readonly repository: OrderRepository,
    ) { }

    public async handle(order_id: string) {
        const order = await this.repository.getOrderById(order_id);
        const parsedOrder = {
            ...order,
            total_amount: Number(order.total_amount),
            products: order.products.map((product) => ({
                ...product,
                quantity: Number(product.quantity),
            })),
        };
        return parsedOrder
    }
}
