import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/sales/infrastructure/repositories/product/product.repository';

@Injectable()
export class FetchProductsHandler {

    constructor(
        @InjectRepository(ProductRepository)
        private readonly repository: ProductRepository,
    ) { }

    public async handle() {
        return await this.repository.fetchProducts();
    }
}
