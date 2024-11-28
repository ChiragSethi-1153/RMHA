import { Optional } from "@nestjs/common";
import { IsArray, IsUUID } from "class-validator";

export class CreateOrderCommand {
    @IsUUID()
    order_id: string;
  
    @IsUUID()
    customer_id: string;
  
    @IsArray()
    products: {
      product_id: string;
      quantity: number;
    }[];

  }