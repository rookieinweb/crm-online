"use strict";
const common_vendor = require("../common/vendor.js");
const TOKEN_KEY = "zhike_token";
const USER_KEY = "zhike_user";
function getToken() {
  return common_vendor.index.getStorageSync(TOKEN_KEY) || "";
}
function setToken(token) {
  common_vendor.index.setStorageSync(TOKEN_KEY, token);
}
function clearToken() {
  common_vendor.index.removeStorageSync(TOKEN_KEY);
  common_vendor.index.removeStorageSync(USER_KEY);
}
function getUser() {
  const raw = common_vendor.index.getStorageSync(USER_KEY);
  return raw || null;
}
function setUser(user) {
  common_vendor.index.setStorageSync(USER_KEY, user);
}
exports.clearToken = clearToken;
exports.getToken = getToken;
exports.getUser = getUser;
exports.setToken = setToken;
exports.setUser = setUser;
