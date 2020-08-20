export interface QueryCustomer {
  id: number

  company_id: number

  name: string

  firstname: string

  lastname: string

  phone: string

  email: string

  source: string

  gender: string

  birthday: Date

  code: string

  image: string

  level_id: number

  total_liabilities: number

  total_orders: number

  total_purchase: number

  last_order_time: Date

  staff_id: number

  is_validate: boolean

  is_highlight: boolean

  is_block: boolean

  is_page: boolean

  list_emails: object

  list_phones: object

  facebook_link: string

  created_by: number

  created_at: Date

  updated_at: Date

  code_index: number
}
