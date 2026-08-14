"use strict";
const api_mock_data = require("./mock/data.js");
function fetchCustomers(params) {
  return api_mock_data.mockGetCustomers(params);
}
function fetchCustomer(id) {
  return api_mock_data.mockGetCustomer(id);
}
function createCustomer(data) {
  return api_mock_data.mockCreateCustomer(data);
}
exports.createCustomer = createCustomer;
exports.fetchCustomer = fetchCustomer;
exports.fetchCustomers = fetchCustomers;
