import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('sales_product')
export class ProductSales {
  @PrimaryColumn({ type: 'uuid', unique: true })
  product_id: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;
}
