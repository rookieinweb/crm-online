import {
  mockGetCustomers,
  mockGetCustomer,
  mockCreateCustomer,
  mockUpdateCustomer
} from './mock/data'

export function fetchCustomers(params) {
  return mockGetCustomers(params)
}

export function fetchCustomer(id) {
  return mockGetCustomer(id)
}

export function createCustomer(data) {
  return mockCreateCustomer(data)
}

export function updateCustomer(id, data) {
  return mockUpdateCustomer(id, data)
}
