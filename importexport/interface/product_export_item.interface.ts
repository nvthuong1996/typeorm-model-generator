import { QueryOperator } from '@Common/interfaces'
export interface QueryProductExportItem {
  id?: number | QueryOperator<number>

  company_id?: number | QueryOperator<number>

  product_id?: number | QueryOperator<number>

  product_sku?: string | QueryOperator<string>

  product_name?: string | QueryOperator<string>

  quantity?: number | QueryOperator<number>

  price?: number | QueryOperator<number>

  cost?: number | QueryOperator<number>

  total?: number | QueryOperator<number>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>

  product_exports_id?: number | QueryOperator<number>
}
