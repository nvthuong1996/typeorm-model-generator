import { QueryOperator } from '@Common/interfaces'
export interface QueryProductTransfers {
  id?: number | QueryOperator<number>

  company_id?: number | QueryOperator<number>

  from_warehouse_id?: number | QueryOperator<number>

  to_warehouse_id?: number | QueryOperator<number>

  list_products?: object | QueryOperator<object>

  note?: string | QueryOperator<string>

  code?: string | QueryOperator<string>

  status?: string | QueryOperator<string>

  created_by?: number | QueryOperator<number>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>
}
