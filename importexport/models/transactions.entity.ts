import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { VForbidden } from '@Common/decorator/fast-validate-decorator'

@Entity('transactions')
export class Transactions {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number

  @Column({ name: 'shop_id' })
  shop_id: number

  @Column({ name: 'name', length: 255 })
  name: string

  @Column({ name: 'code', length: 255 })
  code: string

  @Column({ name: 'type', length: 255 })
  type: string

  @Column({ type: 'bigint', name: 'amount' })
  amount: number

  @Column({ name: 'warehouse_id' })
  warehouse_id: number

  @Column({ name: 'actor_type', length: 255 })
  actor_type: string

  @Column({ name: 'actor_id', nullable: true, default: 0 })
  actor_id?: number | null

  @Column({ name: 'actor_name', nullable: true, length: 255 })
  actor_name?: string | null

  @Column({ name: 'transaction_type', nullable: true, length: 255 })
  transaction_type?: string | null

  @Column({ name: 'payment_method', nullable: true, length: 255 })
  payment_method?: string | null

  @Column({ name: 'note', nullable: true, length: 255 })
  note?: string | null

  @Column({ name: 'created_by', nullable: true, default: 0 })
  @VForbidden()
  created_by?: number | null

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date
}
