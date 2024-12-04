import { Module } from '@nestjs/common';
import { FetchProductsHandler } from './list-products.service';
import { FetchProductsController } from './list-products.controller';
import { ProductRepository } from 'src/sales/infrastructure/repositories/product/product.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { FetchProductsQuery } from './list-products.query';

@Module({
  imports: [CqrsModule],
  controllers: [FetchProductsController],
  providers: [FetchProductsQuery, FetchProductsHandler, ProductRepository],
})
export class FetchProductsModule {}
