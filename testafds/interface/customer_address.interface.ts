export interface QueryCustomerAddress {
  id: number

  company_id: number

  name: string

  organization: string

  email: string

  phone: string

  fax: string

  postal_code: string

  country_code: string

  full: string

  street: string

  ward_code: string

  district_code: string

  province_code: string

  location: string

  is_primary: boolean

  is_billing: boolean

  is_shipping: boolean

  created_at: Date

  updated_at: Date

  customers_id: number
}
