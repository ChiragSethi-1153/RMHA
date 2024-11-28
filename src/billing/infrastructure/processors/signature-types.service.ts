import { Injectable } from '@nestjs/common';
import { OrderPlacedProcessor } from './order-placed/order-placed';


@Injectable()
export class SignatureTypes {
  constructor(
    private readonly orderPlacedProcessor: OrderPlacedProcessor
  ) { }
  public signatureTypes: Record<string, any[]> = {
    'sales.order_placed': [this.orderPlacedProcessor],
    'shipping.back_ordered': [],
    'order.shipped': [],

  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
