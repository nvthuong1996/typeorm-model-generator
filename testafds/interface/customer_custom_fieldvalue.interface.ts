import { QueryOperator } from '@Common/interfaces'
export interface QueryCustomerCustomFieldvalue {
  id?: number | QueryOperator<number>

  comany_id?: number | QueryOperator<number>

  value?: string | QueryOperator<string>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>

  custom_field_id?: number | QueryOperator<number>

  customers_id?: number | QueryOperator<number>
}
