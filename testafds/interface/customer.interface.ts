import { QueryOperator } from '@Common/interfaces'
export interface QueryCustomer {
  id?: number | QueryOperator<number>

  company_id?: number | QueryOperator<number>

  name?: string | QueryOperator<string>

  firstname?: string | QueryOperator<string>

  lastname?: string | QueryOperator<string>

  phone?: string | QueryOperator<string>

  email?: string | QueryOperator<string>

  source?: string | QueryOperator<string>

  gender?: string | QueryOperator<string>

  birthday?: Date | QueryOperator<Date>

  code?: string | QueryOperator<string>

  image?: string | QueryOperator<string>

  level_id?: number | QueryOperator<number>

  total_liabilities?: number | QueryOperator<number>

  total_orders?: number | QueryOperator<number>

  total_purchase?: number | QueryOperator<number>

  last_order_time?: Date | QueryOperator<Date>

  staff_id?: number | QueryOperator<number>

  is_validate?: boolean | QueryOperator<boolean>

  is_highlight?: boolean | QueryOperator<boolean>

  is_block?: boolean | QueryOperator<boolean>

  is_page?: boolean | QueryOperator<boolean>

  list_emails?: object | QueryOperator<object>

  list_phones?: object | QueryOperator<object>

  facebook_link?: string | QueryOperator<string>

  created_by?: number | QueryOperator<number>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>

  code_index?: number | QueryOperator<number>
}
