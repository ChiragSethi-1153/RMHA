import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/sales/infrastructure/repositories/product/product.repository';
import { FetchProductsQuery } from './list-products.query';

@QueryHandler(FetchProductsQuery)
export class FetchProductsHandler implements IQueryHandler<FetchProductsQuery> {

    constructor(
        @InjectRepository(ProductRepository)
        private readonly repository: ProductRepository,
    ) { }

    public async execute() {
        return await this.repository.fetchProducts();
    }
}
