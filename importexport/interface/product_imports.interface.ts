import { QueryOperator } from '@Common/interfaces'
export interface QueryProductImports {
  id?: number | QueryOperator<number>

  company_id?: number | QueryOperator<number>

  supplier_id?: number | QueryOperator<number>

  warehouse_id?: number | QueryOperator<number>

  is_taxable?: boolean | QueryOperator<boolean>

  need_create_transaction?: boolean | QueryOperator<boolean>

  delivery_date?: Date | QueryOperator<Date>

  total_quantity?: number | QueryOperator<number>

  total_amount?: number | QueryOperator<number>

  discount_purchase_type?: string | QueryOperator<string>

  discount_purchase_value?: number | QueryOperator<number>

  discount_purchase?: number | QueryOperator<number>

  cost_purchase_list?: object | QueryOperator<object>

  cost_purchase?: number | QueryOperator<number>

  payment_method?: string | QueryOperator<string>

  payment_amount?: number | QueryOperator<number>

  payment_date?: Date | QueryOperator<Date>

  note?: string | QueryOperator<string>

  code?: string | QueryOperator<string>

  status?: string | QueryOperator<string>

  created_by?: number | QueryOperator<number>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>
}
