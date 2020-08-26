import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { VForbidden } from '@Common/decorator/fast-validate-decorator'
import { ProductTransfersItem } from './product_transfers_item.entity'

@Entity('product_transfers')
export class ProductTransfers {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number

  @Column({ name: 'company_id' })
  company_id: number

  @Column({ name: 'from_warehouse_id' })
  from_warehouse_id: number

  @Column({ name: 'to_warehouse_id' })
  to_warehouse_id: number

  @Column({ name: 'list_products' })
  list_products: object

  @Column({ name: 'note', nullable: true, length: 255 })
  note?: string | null

  @Column({ name: 'code', length: 32 })
  code: string

  @Column({ name: 'status', nullable: true, length: 32, default: 'created' })
  status?: string | null

  @Column({ name: 'created_by', nullable: true })
  @VForbidden()
  created_by?: number | null

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date

  @OneToMany(
    () => ProductTransfersItem,
    (product_transfers_item) => product_transfers_item.product_transfers,
  )
  product_transfers_items?: ProductTransfersItem[]
}
