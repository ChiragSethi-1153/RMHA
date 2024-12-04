import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OutBoxStatus } from './enums/status.enum';

@Entity('shipping_outbox_message')
export class ShippingOutboxMessage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid', unique: true })
  message_id: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'jsonb' })
  headers: any;

  @Column({ type: 'jsonb' })
  properties: any;

  @Column({ type: 'jsonb' })
  body: any;

  @Column({ type: 'enum', enum: OutBoxStatus, default: OutBoxStatus.PENDING })
  status: OutBoxStatus;

  @Column({ type: 'timestamp', nullable: true })
  sent_at: Date;

  public markAsSent(): void {
    if (this.status === OutBoxStatus.SENT) {
      throw new Error('Message is already marked as sent.');
    }

    this.status = OutBoxStatus.SENT;
    this.sent_at = new Date();
  }
}
