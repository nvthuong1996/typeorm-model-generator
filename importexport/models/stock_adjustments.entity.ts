import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { VForbidden } from '@Common/decorator/fast-validate-decorator'

@Entity('stock_adjustments')
export class StockAdjustments {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number

  @Column({ name: 'shop_id' })
  shop_id: number

  @Column({ name: 'code', length: 20 })
  code: string

  @Column({ name: 'warehouse_id' })
  warehouse_id: number

  @Column({ name: 'status', nullable: true, length: 20, default: 'created' })
  status?: string | null

  @Column({ name: 'list_products' })
  list_products: object

  @Column({ name: 'total_quantity', nullable: true, default: 0 })
  total_quantity?: number | null

  @Column({ name: 'total_real_quantity', nullable: true, default: 0 })
  total_real_quantity?: number | null

  @Column({ name: 'note', nullable: true, length: 255 })
  note?: string | null

  @Column({ name: 'created_by', nullable: true })
  @VForbidden()
  created_by?: number | null

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date
}
