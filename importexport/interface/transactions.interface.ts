import { QueryOperator } from '@Common/interfaces'
export interface QueryTransactions {
  id?: number | QueryOperator<number>

  shop_id?: number | QueryOperator<number>

  name?: string | QueryOperator<string>

  code?: string | QueryOperator<string>

  type?: string | QueryOperator<string>

  amount?: number | QueryOperator<number>

  warehouse_id?: number | QueryOperator<number>

  actor_type?: string | QueryOperator<string>

  actor_id?: number | QueryOperator<number>

  actor_name?: string | QueryOperator<string>

  transaction_type?: string | QueryOperator<string>

  payment_method?: string | QueryOperator<string>

  note?: string | QueryOperator<string>

  created_by?: number | QueryOperator<number>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>
}
