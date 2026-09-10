"use strict";
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));
function todayKey(date = /* @__PURE__ */ new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
const today = todayKey();
let visitTasks = [
  {
    id: "t001",
    customerId: "c001",
    customerName: "南京XX科技有限公司",
    planAt: `${today}T10:30:00`,
    address: "南京市建邺区奥体大街68号",
    latitude: 32.004,
    longitude: 118.731,
    distance: null,
    status: "pending"
  },
  {
    id: "t002",
    customerId: "c002",
    customerName: "江苏XX贸易有限公司",
    planAt: `${today}T15:30:00`,
    address: "南京市鼓楼区中山北路100号",
    latitude: 32.068,
    longitude: 118.778,
    distance: null,
    status: "pending"
  },
  {
    id: "t003",
    customerId: "c003",
    customerName: "苏州智能制造有限公司",
    planAt: "2026-08-12T10:00:00",
    address: "苏州市工业园区星湖街328号",
    customerLatitude: 31.316,
    customerLongitude: 120.718,
    distance: 85,
    status: "done"
  }
];
let visitRecords = [
  {
    id: "v001",
    customerId: "c003",
    customerName: "苏州智能制造有限公司",
    checkinAt: "2026-08-12T10:15:00",
    latitude: 31.3162,
    longitude: 120.7181,
    address: "苏州市工业园区星湖街328号",
    customerLatitude: 31.316,
    customerLongitude: 120.718,
    distance: 85,
    remark: "签约现场拜访",
    isValid: true,
    creatorId: "u001",
    creatorName: "张三"
  }
];
function genId(prefix) {
  return `${prefix}${Date.now()}`;
}
async function mockGetVisitTasks() {
  await delay();
  return {
    tasks: visitTasks.filter((item) => {
      var _a;
      return (_a = item.planAt) == null ? void 0 : _a.startsWith(today);
    }),
    records: visitRecords.slice().sort((a, b) => new Date(b.checkinAt) - new Date(a.checkinAt))
  };
}
async function mockCheckin(taskId, checkinData = {}) {
  await delay();
  const task = visitTasks.find((item) => item.id === taskId);
  if (!task)
    throw new Error("拜访任务不存在");
  task.status = "done";
  task.distance = checkinData.distance ?? task.distance;
  const record = {
    id: genId("v"),
    customerId: task.customerId,
    customerName: task.customerName,
    checkinAt: (/* @__PURE__ */ new Date()).toISOString(),
    latitude: checkinData.currentLatitude,
    longitude: checkinData.currentLongitude,
    customerLatitude: checkinData.customerLatitude ?? task.latitude,
    customerLongitude: checkinData.customerLongitude ?? task.longitude,
    address: task.address,
    distance: checkinData.distance ?? task.distance,
    remark: checkinData.remark || "定位范围内完成公司签到",
    isValid: Boolean(checkinData.isValid),
    creatorId: "u001",
    creatorName: "张三"
  };
  visitRecords.unshift(record);
  return record;
}
exports.mockCheckin = mockCheckin;
exports.mockGetVisitTasks = mockGetVisitTasks;
