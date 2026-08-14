"use strict";
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));
function todayKey(date = /* @__PURE__ */ new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
const today = todayKey();
let customers = [
  {
    id: "c001",
    name: "南京XX科技有限公司",
    contactName: "李经理",
    contactPhone: "13811112222",
    industry: "信息技术",
    address: "南京市建邺区奥体大街68号",
    latitude: 32.004,
    longitude: 118.731,
    level: "A",
    status: "following",
    ownerId: "u001",
    ownerName: "张三",
    lastFollowAt: "2026-08-10T14:30:00",
    nextFollowAt: `${today}T15:00:00`,
    dealAmount: 5e4,
    remark: "重点客户，计划推进Q3企业版采购。"
  },
  {
    id: "c002",
    name: "江苏XX贸易有限公司",
    contactName: "王总",
    contactPhone: "13922223333",
    industry: "贸易",
    address: "南京市鼓楼区中山北路100号",
    latitude: 32.068,
    longitude: 118.778,
    level: "B",
    status: "potential",
    ownerId: "u001",
    ownerName: "张三",
    lastFollowAt: "2026-08-08T10:00:00",
    nextFollowAt: `${today}T14:00:00`,
    dealAmount: 0,
    remark: "已发送报价单，今天下午确认采购周期。"
  },
  {
    id: "c003",
    name: "苏州智能制造有限公司",
    contactName: "赵工",
    contactPhone: "13733334444",
    industry: "制造业",
    address: "苏州市工业园区星湖街328号",
    latitude: 31.316,
    longitude: 120.718,
    level: "A",
    status: "deal",
    ownerId: "u001",
    ownerName: "张三",
    lastFollowAt: "2026-08-12T16:00:00",
    nextFollowAt: null,
    dealAmount: 12e4,
    remark: "已签约年度框架，等待二期增购。"
  },
  {
    id: "c004",
    name: "无锡新能源科技",
    contactName: "陈主任",
    contactPhone: "13644445555",
    industry: "新能源",
    address: "无锡市滨湖区建筑西路777号",
    latitude: 31.491,
    longitude: 120.312,
    level: "B",
    status: "following",
    ownerId: "u001",
    ownerName: "张三",
    lastFollowAt: "2026-08-11T09:30:00",
    nextFollowAt: "2026-08-15T10:00:00",
    dealAmount: 0,
    remark: "对储能方案感兴趣，需要主管一起复访。"
  },
  {
    id: "c005",
    name: "常州精密仪器厂",
    contactName: "刘厂长",
    contactPhone: "13555556666",
    industry: "制造业",
    address: "常州市武进区常武路18号",
    latitude: 31.701,
    longitude: 119.974,
    level: "C",
    status: "lost",
    ownerId: "u001",
    ownerName: "张三",
    lastFollowAt: "2026-07-20T11:00:00",
    nextFollowAt: null,
    dealAmount: 0,
    remark: "预算不足，暂缓跟进。"
  }
];
let followRecords = [
  {
    id: "f001",
    customerId: "c001",
    customerName: "南京XX科技有限公司",
    content: "电话沟通Q3采购计划，对方希望下周安排产品演示。",
    type: "phone",
    nextFollowAt: `${today}T15:00:00`,
    creatorId: "u001",
    creatorName: "张三",
    createdAt: "2026-08-10T14:30:00"
  },
  {
    id: "f002",
    customerId: "c002",
    customerName: "江苏XX贸易有限公司",
    content: "微信发送产品报价单，等待对方反馈付款方式。",
    type: "wechat",
    nextFollowAt: `${today}T14:00:00`,
    creatorId: "u001",
    creatorName: "张三",
    createdAt: "2026-08-08T10:00:00"
  },
  {
    id: "f003",
    customerId: "c004",
    customerName: "无锡新能源科技",
    content: "上门拜访并演示储能方案，客户需要内部评审。",
    type: "visit",
    nextFollowAt: "2026-08-15T10:00:00",
    creatorId: "u001",
    creatorName: "张三",
    createdAt: "2026-08-11T09:30:00"
  }
];
let visitTasks = [
  {
    id: "t001",
    customerId: "c001",
    customerName: "南京XX科技有限公司",
    planAt: `${today}T10:30:00`,
    address: "南京市建邺区奥体大街68号",
    distance: 120,
    status: "pending"
  },
  {
    id: "t002",
    customerId: "c002",
    customerName: "江苏XX贸易有限公司",
    planAt: `${today}T15:30:00`,
    address: "南京市鼓楼区中山北路100号",
    distance: 860,
    status: "pending"
  },
  {
    id: "t003",
    customerId: "c003",
    customerName: "苏州智能制造有限公司",
    planAt: "2026-08-12T10:00:00",
    address: "苏州市工业园区星湖街328号",
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
async function mockGetDashboard() {
  await delay();
  const todayFollowCount = customers.filter(
    (item) => item.nextFollowAt && item.nextFollowAt.startsWith(today)
  ).length;
  const dealAmount = customers.reduce((sum, item) => sum + (item.dealAmount || 0), 0);
  const todos = customers.filter((item) => item.nextFollowAt && item.status !== "lost").sort((a, b) => new Date(a.nextFollowAt) - new Date(b.nextFollowAt)).slice(0, 5).map((item) => {
    var _a;
    return {
      id: `todo_${item.id}`,
      customerId: item.id,
      customerName: item.name,
      type: "follow",
      lastContactAt: item.lastFollowAt,
      planTime: item.nextFollowAt,
      priority: ((_a = item.nextFollowAt) == null ? void 0 : _a.startsWith(today)) ? "high" : "normal"
    };
  });
  return {
    stats: {
      customerCount: customers.length,
      todayFollowCount,
      todayVisitCount: visitTasks.filter((item) => {
        var _a;
        return (_a = item.planAt) == null ? void 0 : _a.startsWith(today);
      }).length,
      dealAmount
    },
    todos,
    visitTasks: visitTasks.filter((item) => {
      var _a;
      return (_a = item.planAt) == null ? void 0 : _a.startsWith(today);
    })
  };
}
async function mockGetCustomers(params = {}) {
  await delay();
  let list = [...customers];
  const { keyword, status } = params;
  if (status && status !== "all") {
    list = list.filter((item) => item.status === status);
  }
  if (keyword) {
    const kw = keyword.trim().toLowerCase();
    list = list.filter(
      (item) => item.name.toLowerCase().includes(kw) || item.contactName.toLowerCase().includes(kw) || item.contactPhone.includes(kw)
    );
  }
  list.sort((a, b) => new Date(b.updatedAt || b.lastFollowAt || 0) - new Date(a.updatedAt || a.lastFollowAt || 0));
  return { list, total: list.length };
}
async function mockGetCustomer(id) {
  await delay();
  const customer = customers.find((item) => item.id === id);
  if (!customer)
    throw new Error("客户不存在");
  const follows = followRecords.filter((item) => item.customerId === id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return { ...customer, follows };
}
async function mockCreateCustomer(data) {
  await delay();
  const item = {
    id: genId("c"),
    ownerId: "u001",
    ownerName: "张三",
    dealAmount: 0,
    lastFollowAt: null,
    nextFollowAt: null,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    ...data
  };
  customers.unshift(item);
  return item;
}
async function mockGetFollowRecords() {
  await delay();
  return followRecords.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
async function mockCheckin(taskId) {
  await delay();
  const task = visitTasks.find((item) => item.id === taskId);
  if (!task)
    throw new Error("拜访任务不存在");
  task.status = "done";
  const record = {
    id: genId("v"),
    customerId: task.customerId,
    customerName: task.customerName,
    checkinAt: (/* @__PURE__ */ new Date()).toISOString(),
    latitude: 32.004,
    longitude: 118.731,
    address: task.address,
    distance: task.distance,
    remark: "定位范围内完成公司签到",
    isValid: task.distance <= 300,
    creatorId: "u001",
    creatorName: "张三"
  };
  visitRecords.unshift(record);
  return record;
}
exports.mockCheckin = mockCheckin;
exports.mockCreateCustomer = mockCreateCustomer;
exports.mockGetCustomer = mockGetCustomer;
exports.mockGetCustomers = mockGetCustomers;
exports.mockGetDashboard = mockGetDashboard;
exports.mockGetFollowRecords = mockGetFollowRecords;
exports.mockGetVisitTasks = mockGetVisitTasks;
