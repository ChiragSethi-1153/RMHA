import { Exclude } from 'class-transformer';
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { OrderStatus } from './enums/status-enum';
import { AggregateRoot } from '@nestjs/cqrs';

@Entity('sales_order')
export class Order {
  @PrimaryColumn({ type: 'uuid', unique: true })
  order_id: string;

  @Column('jsonb', { nullable: false })
  products: { product_id: string; quantity: number }[];

  @Column({ type: 'uuid', nullable: false })
  customer_id: string;

  @Column({ type: 'float', nullable: false })
  total_amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Exclude()
  created_at: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
}
