import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { VForbidden } from '@Common/decorator/fast-validate-decorator'
import { ProductExportItem } from './product_export_item.entity'

@Entity('product_exports')
export class ProductExports {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number

  @Column({ name: 'company_id' })
  company_id: number

  @Column({ name: 'warehouse_id' })
  warehouse_id: number

  @Column({ name: 'total_quantity' })
  total_quantity: number

  @Column({ name: 'total_amount' })
  total_amount: number

  @Column({ name: 'refund_method', nullable: true, length: 255 })
  refund_method?: string | null

  @Column({ name: 'refund_amount', nullable: true, default: 0 })
  refund_amount?: number | null

  @Column({ name: 'refund_date', nullable: true })
  refund_date?: Date | null

  @Column({ name: 'need_create_transaction', nullable: true, width: 1, default: 1 })
  need_create_transaction?: boolean | null

  @Column({ name: 'note', nullable: true, length: 640 })
  note?: string | null

  @Column({ name: 'code', length: 32 })
  code: string

  @Column({ name: 'status', length: 32 })
  status: string

  @Column({ name: 'created_by', nullable: true })
  @VForbidden()
  created_by?: number | null

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date

  @OneToMany(
    () => ProductExportItem,
    (product_export_item) => product_export_item.product_exports,
  )
  product_export_items?: ProductExportItem[]
}
