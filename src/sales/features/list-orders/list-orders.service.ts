import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/sales/infrastructure/repositories/orders/order.repository';

@Injectable()
export class ListOrdersHandler {

    constructor(
        @InjectRepository(OrderRepository)
        private readonly repository: OrderRepository,
    ) { }

    public async handle() {
        const orders = await this.repository.listOrders();
        const parsedOrders = orders.map((order) => ({
            ...order,
            total_amount: Number(order.total_amount),
            products: order.products.map((product) => ({
                ...product,
                quantity: Number(product.quantity),
            })),
        }));
        return parsedOrders
    }
}
