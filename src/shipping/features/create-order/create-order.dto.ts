import { IsString, IsUUID } from 'class-validator';

export class CreateOrderCommand {
  @IsUUID()
  order_id: string;

  @IsString()
  shipping_address: string;
}
