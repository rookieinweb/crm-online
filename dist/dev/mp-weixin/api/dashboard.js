"use strict";
const utils_request = require("../utils/request.js");
function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}
function normalizeOverview(data = {}) {
  return {
    effectiveTotal: toNumber(data.effectiveTotal),
    todayCreateNum: toNumber(data.todayCreateNum),
    todayFollowNum: toNumber(data.todayFollowNum),
    MonthlyTransactionVolume: toNumber(data.MonthlyTransactionVolume),
    DealNum: toNumber(data.DealNum ?? data.dealAmount ?? data.deal_amount),
    ...data
  };
}
async function fetchDashboard(params = {}) {
  const overview = normalizeOverview(await utils_request.get("/dashboard/overview", params));
  return {
    stats: overview,
    todos: [],
    visitTasks: []
  };
}
exports.fetchDashboard = fetchDashboard;
