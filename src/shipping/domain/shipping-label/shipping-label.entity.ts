
import {
    Entity,
    PrimaryColumn,
  } from 'typeorm';
  
  @Entity('shipping_label')
  export class ShippingLabel {
    @PrimaryColumn({ type: 'uuid', unique: true })
    order_id: string;

  }
  