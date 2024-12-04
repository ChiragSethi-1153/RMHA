
import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('shipping_order')
export class OrderShipping {
  @PrimaryColumn({ type: 'uuid', unique: true })
  order_id: string;

  @Column({ type: 'text', nullable: false })
  shipping_address: string;

  @Column('jsonb', { nullable: true })
  products: { product_id: string; quantity: number }[];

  @Column({ type: 'boolean', default: false })
  isPlaced: boolean;

  @Column({ type: 'boolean', default: false })
  isBilled: boolean;
}
