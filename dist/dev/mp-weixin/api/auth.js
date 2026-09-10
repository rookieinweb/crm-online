"use strict";
const utils_request = require("../utils/request.js");
function login(data) {
  return utils_request.post("/auth/login", data);
}
exports.login = login;
