import { IsNumber } from 'class-validator';
import {
    Entity,
    PrimaryColumn,
    Column,
  } from 'typeorm';
  
  @Entity('billing_account')
  export class BillingAccount {
    @PrimaryColumn({ type: 'uuid', unique: true })
    billing_account_id: string;
  
    @Column({ type: 'decimal', nullable: false })
    @IsNumber()
    balance: number;
  
    @Column({ type: 'varchar', length: 16, nullable: false })
    card_number: string;
  
  }
  