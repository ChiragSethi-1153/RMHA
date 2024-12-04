import { Module } from '@nestjs/common';
import { GetProductController } from './get-product.controller';
import { GetProductHandler } from './get-product.service';
import { ProductRepository } from 'src/sales/infrastructure/repositories/product/product.repository';

@Module({
  controllers: [GetProductController],
  providers: [GetProductHandler, ProductRepository],
})
export class GetProductModule {}
