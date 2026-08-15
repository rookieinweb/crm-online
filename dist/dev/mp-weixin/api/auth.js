"use strict";
const utils_request = require("../utils/request.js");
function login(data) {
  return utils_request.post("/auth/login", data);
}
function getDashboardOverview(data) {
  return utils_request.get("/dashboard/overview", data);
}
exports.getDashboardOverview = getDashboardOverview;
exports.login = login;
