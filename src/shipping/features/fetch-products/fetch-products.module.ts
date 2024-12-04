import { Module } from '@nestjs/common';
import { FetchProductsHandler } from './fetch-products.service';
import { FetchProductsController } from './fetch-products.controller';

@Module({
  controllers: [FetchProductsController],
  providers: [FetchProductsHandler],
})
export class FetchProductsModule {}
