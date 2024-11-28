import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('billing_orders') 
export class OrderBilling {
  @PrimaryColumn({ type: 'uuid', unique: true })
  order_id: string;

  @Column({ type: 'uuid', nullable: false })
  billing_account_id: string;

  @Column({ type: 'text', nullable: false })
  billing_address: string;
}
