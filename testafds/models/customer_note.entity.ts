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

@Entity('customer_note')
export class CustomerNote {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number

  @Column({ name: 'company_id' })
  company_id: number

  @Column({ name: 'note', nullable: true })
  note?: string | null

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date

  @Column({ name: 'customers_id' })
  customers_id: number

  @ManyToOne(() => Customer, (customer) => customer.customer_notes, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'customers_id', referencedColumnName: 'id' }])
  customers?: Customer
}
