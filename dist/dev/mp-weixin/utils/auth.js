"use strict";
const common_vendor = require("../common/vendor.js");
const USER_KEY = "zhike_user";
function getUser() {
  const raw = common_vendor.index.getStorageSync(USER_KEY);
  return raw || null;
}
function setUser(user) {
  common_vendor.index.setStorageSync(USER_KEY, user);
}
exports.getUser = getUser;
exports.setUser = setUser;
