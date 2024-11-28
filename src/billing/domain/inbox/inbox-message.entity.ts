import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('billing_inbox_message')
  @Unique('billing_unique_message_handler', ['message_id', 'handler_name'])
  export class BillingInboxMessage {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'uuid' })
    message_id: string;
  
    @Column({ type: 'varchar' })
    handler_name: string;
  
    @CreateDateColumn({ type: 'timestamp', name: 'handled_at' })
    handled_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  }
  