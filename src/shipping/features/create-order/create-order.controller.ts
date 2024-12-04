import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderHandler } from './create-order.service';

@Controller('api/v1/shipping/orders')
export class CreateOrderController {
  constructor(private readonly handler: CreateOrderHandler) {}

  @Post('/')
  async handle(@Body() body: any) {
    return await this.handler.handle(body);
  }
}
