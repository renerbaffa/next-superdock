/* eslint-disable camelcase */
export interface CompanyType {
  id: number
  name: string
  sanitized_name: string
  address: {
    address: string
    postal_code: string
    city: string
    country_code: string
  }
  created_at: string
  tenant: number
  test_data: boolean
}
/* eslint-enable camelcase */
