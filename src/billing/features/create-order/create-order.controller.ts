import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderHandler } from './create-order.service';
import { CreateOrderCommand } from './create-order.dto';

@Controller('api/v1/billing/orders')
export class CreateOrderController {
  constructor(private readonly handler: CreateOrderHandler) {}

  @Post('/')
  async handle(@Body() body: CreateOrderCommand) {
    return await this.handler.handle(body);
  }
}
