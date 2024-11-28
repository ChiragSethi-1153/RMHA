import { Controller, Get } from '@nestjs/common';
import { ListOrdersHandler } from './list-orders.service';

@Controller('api/v1/sales/orders')
export class ListOrdersController {

    constructor(
        private readonly handler: ListOrdersHandler
    ) { }

    @Get('/')
    async handle() {
        return await this.handler.handle();
    }

}