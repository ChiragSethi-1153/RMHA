import { Module } from "@nestjs/common";
import { FetchProductsHandler } from "./fetch-products.service";
import { FetchProductsController } from "./fetch-products.controller";
import { ProductRepository } from "src/sales/infrastructure/repositories/product/product.repository";

@Module({
    controllers: [FetchProductsController],
    providers: [
      FetchProductsHandler, ProductRepository
    ],
})

export class FetchProductsModule {}