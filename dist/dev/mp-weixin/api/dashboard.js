"use strict";
const api_mock_data = require("./mock/data.js");
function fetchDashboard() {
  return api_mock_data.mockGetDashboard();
}
exports.fetchDashboard = fetchDashboard;
