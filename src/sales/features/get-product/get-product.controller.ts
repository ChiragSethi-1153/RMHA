import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { GetProductHandler } from './get-product.service';

@Controller('api/v1/sales/products')
export class GetProductController {
  constructor(private readonly handler: GetProductHandler) {}

  @Get('/:id')
  async getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return await this.handler.handle(id);
  }
}
