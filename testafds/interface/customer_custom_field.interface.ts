import { QueryOperator } from '@Common/interfaces'
export interface QueryCustomerCustomField {
  id?: number | QueryOperator<number>

  company_id?: number | QueryOperator<number>

  name?: string | QueryOperator<string>

  data_type?: 'number' | 'string' | 'text' | 'boolean'

  is_required?: boolean | QueryOperator<boolean>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>
}
