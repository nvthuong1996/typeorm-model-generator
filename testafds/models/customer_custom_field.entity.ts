import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CustomerCustomFieldvalue } from './customer_custom_fieldvalue.entity'

@Entity('customer_custom_field')
export class CustomerCustomField {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ name: 'company_id' })
  company_id: number

  @Column({ name: 'name', length: 255 })
  name: string

  @Column({
    name: 'data_type',
    nullable: true,
    enum: ['number', 'string', 'text', 'boolean'],
    default: 'string',
  })
  data_type?: 'number' | 'string' | 'text' | 'boolean' | null

  @Column({ name: 'is_required', nullable: true, width: 1, default: 0 })
  is_required?: boolean | null

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  @OneToMany(
    () => CustomerCustomFieldvalue,
    (customer_custom_fieldvalue) => customer_custom_fieldvalue.custom_field,
  )
  customer_custom_fieldvalues: CustomerCustomFieldvalue[]
}
