import { QueryOperator } from '@Common/interfaces'
export interface QueryStockAdjustments {
  id?: number | QueryOperator<number>

  shop_id?: number | QueryOperator<number>

  code?: string | QueryOperator<string>

  warehouse_id?: number | QueryOperator<number>

  status?: string | QueryOperator<string>

  list_products?: object | QueryOperator<object>

  total_quantity?: number | QueryOperator<number>

  total_real_quantity?: number | QueryOperator<number>

  note?: string | QueryOperator<string>

  created_by?: number | QueryOperator<number>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>
}
