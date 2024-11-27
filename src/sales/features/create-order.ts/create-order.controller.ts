import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderCommand } from "./create-order.dto";
import { CreateOrderHandler } from "./create-order.service";

@Controller('orders')
export class CreateOrderController {
    constructor(private readonly handler: CreateOrderHandler){}

    @Post('/')
    async handle(@Body() orderData: CreateOrderCommand) {
        return await this.handler.handle(orderData)
    }

}