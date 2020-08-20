import { QueryOperator } from '@Common/interfaces'
export interface QueryCustomerNote {
  id?: number | QueryOperator<number>

  company_id?: number | QueryOperator<number>

  note?: string | QueryOperator<string>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>

  customers_id?: number | QueryOperator<number>
}
