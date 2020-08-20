export interface QueryCustomerCustomField {
  id: number

  company_id: number

  name: string

  data_type: 'number' | 'string' | 'text' | 'boolean'

  is_required: boolean

  created_at: Date

  updated_at: Date
}
