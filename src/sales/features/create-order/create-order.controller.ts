import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderDto } from "./create-order.dto";
import { CommandBus } from "@nestjs/cqrs";
import { CreateOrderCommand } from "./create-order.command";

@Controller('api/v1/sales/orders')
export class CreateOrderController {
    constructor(
        private commandBus: CommandBus
    ){}

    @Post('/')
    async handle(@Body() orderData: CreateOrderDto) {
        return this.commandBus.execute(
            new CreateOrderCommand(orderData.order_id, orderData.customer_id, orderData.products)
        )
    }

}