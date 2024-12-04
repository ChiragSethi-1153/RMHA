import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { GetOrdersHandler } from './get-order.service';

@Controller('api/v1/sales/orders')
export class GetOrderController {
  constructor(private handler: GetOrdersHandler) {}

  @Get('/:id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.handler.handle(id);
  }
}
