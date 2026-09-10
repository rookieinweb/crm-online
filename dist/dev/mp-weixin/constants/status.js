"use strict";
const CUSTOMER_STATUS = {
  potential: { label: "潜在客户", color: "#64748b", bg: "#eef2f7" },
  contacted: { label: "已联系", color: "#2563eb", bg: "#dbeafe" },
  intention: { label: "意向客户", color: "#7c3aed", bg: "#ede9fe" },
  negotiating: { label: "商谈中", color: "#c2410c", bg: "#ffedd5" },
  following: { label: "跟进中", color: "#2563eb", bg: "#dbeafe" },
  deal: { label: "已成交", color: "#059669", bg: "#d1fae5" },
  lost: { label: "已流失", color: "#dc2626", bg: "#fee2e2" },
  invalid: { label: "无效客户", color: "#6b7280", bg: "#f3f4f6" }
};
const CUSTOMER_LEVELS = ["A", "B", "C"];
const FOLLOW_TYPES = {
  电话: "电话",
  微信: "微信",
  拜访: "拜访",
  phone: "电话",
  visit: "拜访",
  wechat: "微信",
  email: "邮件",
  other: "其他"
};
exports.CUSTOMER_LEVELS = CUSTOMER_LEVELS;
exports.CUSTOMER_STATUS = CUSTOMER_STATUS;
exports.FOLLOW_TYPES = FOLLOW_TYPES;
