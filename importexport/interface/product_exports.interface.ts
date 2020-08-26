import { QueryOperator } from '@Common/interfaces'
export interface QueryProductExports {
  id?: number | QueryOperator<number>

  company_id?: number | QueryOperator<number>

  warehouse_id?: number | QueryOperator<number>

  total_quantity?: number | QueryOperator<number>

  total_amount?: number | QueryOperator<number>

  refund_method?: string | QueryOperator<string>

  refund_amount?: number | QueryOperator<number>

  refund_date?: Date | QueryOperator<Date>

  need_create_transaction?: boolean | QueryOperator<boolean>

  note?: string | QueryOperator<string>

  code?: string | QueryOperator<string>

  status?: string | QueryOperator<string>

  created_by?: number | QueryOperator<number>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>
}
