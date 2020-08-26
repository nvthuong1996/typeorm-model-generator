import {
  Column,
  Entity,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { VForbidden } from '@Common/decorator/fast-validate-decorator'
import { ProductImports } from './product_imports.entity'

@Entity('product_import_item')
export class ProductImportItem {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number

  @Column({ name: 'company_id' })
  company_id: number

  @Column({ name: 'product_id' })
  product_id: number

  @Column({ name: 'product_sku', length: 255 })
  product_sku: string

  @Column({ name: 'product_name', length: 255 })
  product_name: string

  @Column({ name: 'quantity' })
  quantity: number

  @Column({ type: 'bigint', name: 'price', nullable: true, default: 0 })
  price?: number | null

  @Column({ type: 'bigint', name: 'cost', nullable: true, default: 0 })
  cost?: number | null

  @Column({ type: 'bigint', name: 'total' })
  total: number

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date

  @Column({ name: 'product_imports_id' })
  @VForbidden()
  product_imports_id: number

  @ManyToOne(() => ProductImports, (product_imports) => product_imports.product_import_items, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'product_imports_id', referencedColumnName: 'id' }])
  product_imports?: ProductImports
}
