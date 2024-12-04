import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FetchProductsQuery } from './list-products.query';

@Controller('api/v1/sales/products')
export class FetchProductsController {

    constructor(
        private readonly queryBus: QueryBus
    ) { }

    @Get('/')
    async fetchProducts() {
        return await this.queryBus.execute(new FetchProductsQuery());
    }

}