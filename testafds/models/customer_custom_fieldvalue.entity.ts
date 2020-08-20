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
import { CustomerCustomField } from './customer_custom_field.entity'

@Entity('customer_custom_fieldvalue')
export class CustomerCustomFieldvalue {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ name: 'comany_id' })
  comany_id: number

  @Column({ name: 'value' })
  value: string

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  @Column({ name: 'custom_field_id' })
  custom_field_id: number

  @Column({ name: 'customers_id' })
  customers_id: number

  @ManyToOne(() => Customer, (customer) => customer.customerCustomFieldvalues, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'customers_id', referencedColumnName: 'id' }])
  customers: Customer

  @ManyToOne(
    () => CustomerCustomField,
    (customerCustomField) => customerCustomField.customerCustomFieldvalues,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'custom_field_id', referencedColumnName: 'id' }])
  custom_field: CustomerCustomField
}
