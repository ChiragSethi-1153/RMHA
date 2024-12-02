import { Controller, Get, Param } from '@nestjs/common';
import { GetOrderHandler } from './get-order.service';

@Controller('api/v1/billing/orders')
export class GetOrderController {
  constructor(private readonly handler: GetOrderHandler) {}
  
  @Get('/:id')
  async getBillingAccountById(@Param('id') id: string) {
    return await this.handler.handle(id);
  }
}
