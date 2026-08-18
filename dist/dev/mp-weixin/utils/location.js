"use strict";
const common_vendor = require("../common/vendor.js");
const EARTH_RADIUS = 6371e3;
const CHECKIN_MAX_DISTANCE = 1e3;
function calcDistance(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    common_vendor.index.getLocation({
      type: "gcj02",
      isHighAccuracy: true,
      success: (res) => {
        resolve({
          latitude: res.latitude,
          longitude: res.longitude,
          address: ""
        });
      },
      fail: (err) => {
        reject(new Error(err.errMsg || "获取定位失败，请授权位置权限"));
      }
    });
  });
}
function geocodeAddress(address) {
  return new Promise((resolve, reject) => {
    if (!address) {
      reject(new Error("客户地址不能为空"));
      return;
    }
    {
      reject(new Error("请先配置腾讯地图 key，用于客户地址解析"));
      return;
    }
  });
}
async function resolveCustomerLocation(customer) {
  if ((customer == null ? void 0 : customer.latitude) && (customer == null ? void 0 : customer.longitude)) {
    return {
      latitude: customer.latitude,
      longitude: customer.longitude,
      address: customer.address || ""
    };
  }
  return geocodeAddress(customer == null ? void 0 : customer.address);
}
function isValidCheckinDistance(distance) {
  return Number(distance) <= CHECKIN_MAX_DISTANCE;
}
exports.CHECKIN_MAX_DISTANCE = CHECKIN_MAX_DISTANCE;
exports.calcDistance = calcDistance;
exports.getCurrentLocation = getCurrentLocation;
exports.isValidCheckinDistance = isValidCheckinDistance;
exports.resolveCustomerLocation = resolveCustomerLocation;
