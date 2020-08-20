import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Customer } from './customer.entity'

@Entity('customer_tag')
export class CustomerTag {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ name: 'company_id' })
  company_id: number

  @Column({ name: 'name', length: 255 })
  name: string

  @Column({ name: 'total_taggable', nullable: true, default: 0 })
  total_taggable: number | null

  @Column({ name: 'slug', length: 255 })
  slug: string

  @Column({ name: 'color', length: 255 })
  color: string

  @Column({ name: 'created_by', nullable: true, default: 0 })
  created_by: number | null

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  @ManyToMany(() => Customer, (customer) => customer.customerTags)
  customers: Customer[]
}
