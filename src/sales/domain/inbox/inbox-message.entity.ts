import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sales_inbox_message')
@Unique('sales_unique_message_handler', ['message_id', 'handler_name'])
export class InboxMessage {
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
