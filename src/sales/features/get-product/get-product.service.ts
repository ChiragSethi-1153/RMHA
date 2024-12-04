import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/sales/infrastructure/repositories/product/product.repository';

@Injectable()
export class GetProductHandler {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  public async handle(product_id: string) {
    return this.productRepository.getProduct(product_id);
  }
}
