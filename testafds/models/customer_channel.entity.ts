import {
  Column,
  Entity,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Customer } from './customer.entity'

@Entity('customer_channel')
export class CustomerChannel {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ name: 'company_id' })
  company_id: number

  @Column({ name: 'channel_id' })
  channel_id: number

  @Column({ name: 'source_id', length: 255 })
  source_id: string

  @Column({ name: 'name', length: 255 })
  name: string

  @Column({ name: 'user_ref', nullable: true, length: 255 })
  user_ref: string | null

  @Column({ name: 'is_page', nullable: true, width: 1, default: 0 })
  is_page: boolean | null

  @Column({ name: 'first_receive_time', nullable: true, default: () => "'0'" })
  first_receive_time: string | null

  @Column({ name: 'staff_id', nullable: true, default: 0 })
  staff_id: number | null

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  @Column({ name: 'customer_id' })
  customer_id: number

  @ManyToOne(() => Customer, (customer) => customer.customerChannels, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customer
}
