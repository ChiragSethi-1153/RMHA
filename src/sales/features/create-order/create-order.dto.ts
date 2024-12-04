import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  order_id: string;

  @IsUUID()
  @IsNotEmpty()
  customer_id: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Products)
  products: Products[];
}

export class Products {
  @IsUUID()
  @IsNotEmpty()
  product_id: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
