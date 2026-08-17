"use strict";
const common_vendor = require("../common/vendor.js");
const utils_auth = require("./auth.js");
var define_import_meta_env_default = { VITE_API_URL: "http://127.0.0.1:7001", VITE_CJS_IGNORE_WARNING: "true", VITE_ROOT_DIR: "D:\\demo\\wx-uni", VITE_USER_NODE_ENV: "development", BASE_URL: "/", MODE: "development", DEV: true, PROD: false, SSR: false };
const BASE_URL = "http://127.0.0.1:7001";
console.log("import.meta.env", define_import_meta_env_default);
console.log("BASE_URL", BASE_URL);
function request(options) {
  console.log("BASE_URL", BASE_URL, options.url);
  return new Promise((resolve, reject) => {
    const token = utils_auth.getToken();
    common_vendor.index.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || "GET",
      data: options.data,
      header: {
        "Content-Type": "application/json",
        ...token ? { Authorization: `Bearer ${token}` } : {},
        ...options.header
      },
      success(res) {
        const { statusCode, data } = res;
        if (statusCode >= 200 && statusCode < 300) {
          resolve((data == null ? void 0 : data.data) !== void 0 ? data.data : data);
          return;
        }
        reject(new Error((data == null ? void 0 : data.message) || "请求失败"));
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
function get(url, data) {
  return request({ url, method: "GET", data });
}
function post(url, data) {
  return request({ url, method: "POST", data });
}
exports.get = get;
exports.post = post;
