import {
  mockGetCustomers,
  mockGetCustomer,
  mockCreateCustomer,
  mockUpdateCustomer
} from './mock/data'
import { post, get } from "@/utils/request";
export function fetchCustomers(params) {
  return get("/customer/list", params);
}

export function fetchCustomer(id) {
  return get(`/customer/detail/${id}`);
}

export function createCustomer(data) {
  return mockCreateCustomer(data)
}

export function updateCustomer(id, data) {
  return mockUpdateCustomer(id, data)
}
