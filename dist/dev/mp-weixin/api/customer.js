"use strict";
const api_mock_data = require("./mock/data.js");
const utils_request = require("../utils/request.js");
function fetchCustomers(params) {
  return utils_request.get("/customer/list", params);
}
function fetchCustomer(id) {
  return utils_request.get(`/customer/detail/${id}`);
}
function createCustomer(data) {
  return api_mock_data.mockCreateCustomer(data);
}
exports.createCustomer = createCustomer;
exports.fetchCustomer = fetchCustomer;
exports.fetchCustomers = fetchCustomers;
