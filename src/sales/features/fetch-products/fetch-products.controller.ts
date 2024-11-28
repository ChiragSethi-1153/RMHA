import { Controller, Get } from '@nestjs/common';
import { FetchProductsHandler } from './fetch-products.service';

@Controller('api/v1/sales/products')
export class FetchProductsController {

    constructor(
        private readonly handler: FetchProductsHandler
    ) { }

    @Get('/')
    async handle() {
        return await this.handler.handle();
    }

}