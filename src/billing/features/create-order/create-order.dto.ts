import { IsString, IsUUID } from 'class-validator';

export class CreateOrderCommand {
  @IsUUID()
  order_id: string;

  @IsUUID()
  billing_account_id: string;

  @IsString()
  billing_address: string;
}
