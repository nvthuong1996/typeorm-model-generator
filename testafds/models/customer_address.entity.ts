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

@Entity('customer_address')
export class CustomerAddress {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number

  @Column({ name: 'company_id', nullable: true, default: 0 })
  company_id?: number | null

  @Column({ name: 'name', nullable: true, length: 255 })
  name?: string | null

  @Column({ name: 'organization', nullable: true, length: 255 })
  organization?: string | null

  @Column({ name: 'email', nullable: true, length: 255 })
  email?: string | null

  @Column({ name: 'phone', nullable: true, length: 20 })
  phone?: string | null

  @Column({ name: 'fax', nullable: true, length: 20 })
  fax?: string | null

  @Column({ name: 'postal_code', nullable: true, length: 20 })
  postal_code?: string | null

  @Column({ name: 'country_code', nullable: true, length: 20, default: 'VN' })
  country_code?: string | null

  @Column({ name: 'full', nullable: true, length: 255 })
  full?: string | null

  @Column({ name: 'street', nullable: true, length: 200 })
  street?: string | null

  @Column({ name: 'ward_code', nullable: true, length: 20 })
  ward_code?: string | null

  @Column({ name: 'district_code', nullable: true, length: 20 })
  district_code?: string | null

  @Column({ name: 'province_code', nullable: true, length: 20 })
  province_code?: string | null

  @Column({ name: 'location', nullable: true, length: 255 })
  location?: string | null

  @Column({ name: 'is_primary', nullable: true, width: 1, default: 0 })
  is_primary?: boolean | null

  @Column({ name: 'is_billing', nullable: true, width: 1, default: 0 })
  is_billing?: boolean | null

  @Column({ name: 'is_shipping', nullable: true, width: 1, default: 0 })
  is_shipping?: boolean | null

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date

  @Column({ name: 'customers_id' })
  customers_id: number

  @ManyToOne(() => Customer, (customer) => customer.customer_addresses, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'customers_id', referencedColumnName: 'id' }])
  customers?: Customer
}
