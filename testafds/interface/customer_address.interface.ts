import { QueryOperator } from '@Common/interfaces'
export interface QueryCustomerAddress {
  id?: number | QueryOperator<number>

  company_id?: number | QueryOperator<number>

  name?: string | QueryOperator<string>

  organization?: string | QueryOperator<string>

  email?: string | QueryOperator<string>

  phone?: string | QueryOperator<string>

  fax?: string | QueryOperator<string>

  postal_code?: string | QueryOperator<string>

  country_code?: string | QueryOperator<string>

  full?: string | QueryOperator<string>

  street?: string | QueryOperator<string>

  ward_code?: string | QueryOperator<string>

  district_code?: string | QueryOperator<string>

  province_code?: string | QueryOperator<string>

  location?: string | QueryOperator<string>

  is_primary?: boolean | QueryOperator<boolean>

  is_billing?: boolean | QueryOperator<boolean>

  is_shipping?: boolean | QueryOperator<boolean>

  created_at?: Date | QueryOperator<Date>

  updated_at?: Date | QueryOperator<Date>

  customers_id?: number | QueryOperator<number>
}
