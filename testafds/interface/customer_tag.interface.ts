import { QueryOperator } from '@Common/interfaces'
export interface QueryCustomerTag {
  id?: number | QueryOperator<number>

  company_id?: number | QueryOperator<number>

  name?: string | QueryOperator<string>

  total_taggable?: number | QueryOperator<number>

  slug?: string | QueryOperator<string>

  color?: string | QueryOperator<string>

  created_by?: number | QueryOperator<number>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>
}
