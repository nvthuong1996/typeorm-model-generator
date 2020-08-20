import { QueryOperator } from '@Common/interfaces'
export interface QueryCustomerChannel {
  id?: number | QueryOperator<number>

  company_id?: number | QueryOperator<number>

  channel_id?: number | QueryOperator<number>

  source_id?: string | QueryOperator<string>

  name?: string | QueryOperator<string>

  user_ref?: string | QueryOperator<string>

  is_page?: boolean | QueryOperator<boolean>

  first_receive_time?: string | QueryOperator<string>

  staff_id?: number | QueryOperator<number>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>

  customer_id?: number | QueryOperator<number>
}
