import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateOrderModule } from './features/create-order/create-order.module';
import { PlaceOrderModule } from './features/place-order/place-order.module';
import { FetchProductsModule } from './features/list-products/list-products.module';
import { ListOrdersModule } from './features/list-orders/list-orders.module';
import { GetOrdersModule } from './features/get-order/get-order.module';
import { GetProductModule } from './features/get-product/get-product.module';

@Module({
  imports: [
    CreateOrderModule,
    PlaceOrderModule,
    FetchProductsModule,
    ListOrdersModule,
    GetOrdersModule,
    GetProductModule,
  ],
  controllers: [],
  providers: [],
})
export class SalesModule {}
