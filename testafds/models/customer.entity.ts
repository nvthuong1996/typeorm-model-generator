import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CustomerAddress } from './customer_address.entity'
import { CustomerChannel } from './customer_channel.entity'
import { CustomerCustomFieldvalue } from './customer_custom_fieldvalue.entity'
import { CustomerNote } from './customer_note.entity'
import { CustomerTag } from './customer_tag.entity'

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ name: 'company_id' })
  company_id: number

  @Column({ name: 'name', length: 255 })
  name: string

  @Column({ name: 'firstname', nullable: true, length: 255 })
  firstname?: string | null

  @Column({ name: 'lastname', nullable: true, length: 255 })
  lastname?: string | null

  @Column({ name: 'phone', nullable: true, length: 50 })
  phone?: string | null

  @Column({ name: 'email', nullable: true, length: 255 })
  email?: string | null

  @Column({ name: 'source', nullable: true, length: 255, default: 'web' })
  source?: string | null

  @Column({ name: 'gender', nullable: true, length: 10, default: 'male' })
  gender?: string | null

  @Column({ name: 'birthday', nullable: true })
  birthday?: Date | null

  @Column({ name: 'code', length: 255 })
  code: string

  @Column({ name: 'image', nullable: true, length: 255 })
  image?: string | null

  @Column({ name: 'level_id', nullable: true, default: 0 })
  level_id?: number | null

  @Column({ name: 'total_liabilities', nullable: true, default: 0 })
  total_liabilities?: number | null

  @Column({ name: 'total_orders', nullable: true, default: 0 })
  total_orders?: number | null

  @Column({ name: 'total_purchase', nullable: true, default: 0 })
  total_purchase?: number | null

  @Column({ name: 'last_order_time', nullable: true })
  last_order_time?: Date | null

  @Column({ name: 'staff_id', nullable: true })
  staff_id?: number | null

  @Column({ name: 'is_validate', nullable: true, width: 1, default: 1 })
  is_validate?: boolean | null

  @Column({ name: 'is_highlight', nullable: true, width: 1, default: 0 })
  is_highlight?: boolean | null

  @Column({ name: 'is_block', nullable: true, width: 1, default: 0 })
  is_block?: boolean | null

  @Column({ name: 'is_page', nullable: true, width: 1, default: 0 })
  is_page?: boolean | null

  @Column({ name: 'list_emails', nullable: true })
  list_emails?: object | null

  @Column({ name: 'list_phones', nullable: true })
  list_phones?: object | null

  @Column({ name: 'facebook_link', nullable: true, length: 255 })
  facebook_link?: string | null

  @Column({ name: 'created_by', nullable: true, default: 0 })
  created_by?: number | null

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  @Column({ name: 'code_index', nullable: true })
  code_index?: number | null

  @OneToMany(() => CustomerAddress, (customer_address) => customer_address.customers)
  customer_addresses: CustomerAddress[]

  @OneToMany(() => CustomerChannel, (customer_channel) => customer_channel.customer)
  customer_channels: CustomerChannel[]

  @OneToMany(
    () => CustomerCustomFieldvalue,
    (customer_custom_fieldvalue) => customer_custom_fieldvalue.customers,
  )
  customer_custom_fieldvalues: CustomerCustomFieldvalue[]

  @OneToMany(() => CustomerNote, (customer_note) => customer_note.customers)
  customer_notes: CustomerNote[]

  @ManyToMany(() => CustomerTag, (customer_tag) => customer_tag.customers)
  @JoinTable({
    name: 'customers_has_tags',
    joinColumns: [{ name: 'customers_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'tags_id', referencedColumnName: 'id' }],
  })
  customer_tags: CustomerTag[]
}
