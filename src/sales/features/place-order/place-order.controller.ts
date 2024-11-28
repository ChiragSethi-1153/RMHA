import { Controller, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { PlaceOrderHandler } from './place-order.service';

@Controller('api/v1/sales/orders')
export class PlaceOrderController {

    constructor(
        private readonly handler: PlaceOrderHandler
    ) { }

    @Patch('/:order_id/place')
    async handle(@Param('order_id', ParseUUIDPipe) order_id: string) {
        return await this.handler.handle(order_id);
    }
}