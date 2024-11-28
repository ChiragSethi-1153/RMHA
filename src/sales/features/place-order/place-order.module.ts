import { Module } from "@nestjs/common";
import { PlaceOrderController } from "./place-order.controller";
import { PlaceOrderHandler } from "./place-order.service";
import { OrderRepository } from "src/sales/infrastructure/repositories/orders/order.repository";
import { OutboxMessageRepository } from "src/sales/infrastructure/repositories/outbox-message/outbox-message.repository";
import { GetOrdersModule } from "../get-order/get-order.module";
import { GetOrdersHandler } from "../get-order/get-order.service";

@Module({
    imports: [GetOrdersModule],
    controllers: [PlaceOrderController],
    providers: [
        PlaceOrderHandler, OrderRepository, OutboxMessageRepository, GetOrdersHandler
    ],
})

export class PlaceOrderModule {}