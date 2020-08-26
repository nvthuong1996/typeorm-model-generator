import {
  Column,
  Entity,
  Unique,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { VForbidden } from '@Common/decorator/fast-validate-decorator'
import { ProductImportItem } from './product_import_item.entity'

@Unique('status_UNIQUE', ['status'])
@Entity('product_imports')
export class ProductImports {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number

  @Column({ name: 'company_id' })
  company_id: number

  @Column({ name: 'supplier_id', nullable: true, default: 0 })
  supplier_id?: number | null

  @Column({ name: 'warehouse_id' })
  warehouse_id: number

  @Column({ name: 'is_taxable', nullable: true, width: 1, default: 0 })
  is_taxable?: boolean | null

  @Column({ name: 'need_create_transaction', nullable: true, width: 1, default: 1 })
  need_create_transaction?: boolean | null

  @Column({ name: 'delivery_date', nullable: true })
  delivery_date?: Date | null

  @Column({ name: 'total_quantity' })
  total_quantity: number

  @Column({ type: 'bigint', name: 'total_amount' })
  total_amount: number

  @Column({ name: 'discount_purchase_type', nullable: true, length: 12, default: 'absolute' })
  discount_purchase_type?: string | null

  @Column({ type: 'bigint', name: 'discount_purchase_value', nullable: true, default: 0 })
  discount_purchase_value?: number | null

  @Column({ type: 'bigint', name: 'discount_purchase', nullable: true, default: 0 })
  discount_purchase?: number | null

  @Column({ name: 'cost_purchase_list', nullable: true })
  cost_purchase_list?: object | null

  @Column({ name: 'cost_purchase', nullable: true, default: 0 })
  cost_purchase?: number | null

  @Column({ name: 'payment_method', nullable: true, length: 255 })
  payment_method?: string | null

  @Column({ type: 'bigint', name: 'payment_amount', nullable: true, default: 0 })
  payment_amount?: number | null

  @Column({ name: 'payment_date', nullable: true })
  payment_date?: Date | null

  @Column({ name: 'note', nullable: true, length: 640 })
  note?: string | null

  @Column({ name: 'code', length: 32 })
  code: string

  @Column({ name: 'status', unique: true, length: 32 })
  status: string

  @Column({ name: 'created_by', nullable: true })
  @VForbidden()
  created_by?: number | null

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date

  @OneToMany(
    () => ProductImportItem,
    (product_import_item) => product_import_item.product_imports,
  )
  product_import_items?: ProductImportItem[]
}
