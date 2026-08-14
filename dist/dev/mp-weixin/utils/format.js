"use strict";
function formatMoney(amount) {
  const num = Number(amount) || 0;
  return `¥${num.toLocaleString("zh-CN")}`;
}
function formatCompactMoney(amount) {
  const num = Number(amount) || 0;
  if (num >= 1e4) {
    return `¥${(num / 1e4).toFixed(num % 1e4 === 0 ? 0 : 1)}万`;
  }
  return formatMoney(num);
}
function formatDate(dateStr, fmt = "MM月DD日") {
  if (!dateStr)
    return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime()))
    return dateStr;
  const map = {
    YYYY: d.getFullYear(),
    MM: String(d.getMonth() + 1).padStart(2, "0"),
    DD: String(d.getDate()).padStart(2, "0"),
    HH: String(d.getHours()).padStart(2, "0"),
    mm: String(d.getMinutes()).padStart(2, "0")
  };
  return fmt.replace(/YYYY|MM|DD|HH|mm/g, (k) => map[k]);
}
function formatPlanTime(timeStr) {
  if (!timeStr)
    return "未设置";
  const d = new Date(timeStr);
  const today = /* @__PURE__ */ new Date();
  const isToday = d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
  if (isToday) {
    const hour = d.getHours();
    if (hour < 12)
      return `今天上午 ${formatDate(timeStr, "HH:mm")}`;
    if (hour < 18)
      return `今天下午 ${formatDate(timeStr, "HH:mm")}`;
    return `今天晚上 ${formatDate(timeStr, "HH:mm")}`;
  }
  return formatDate(timeStr, "MM月DD日 HH:mm");
}
function formatWeekday(date = /* @__PURE__ */ new Date()) {
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  return `星期${weekdays[date.getDay()]}`;
}
function formatTodayHeader(date = /* @__PURE__ */ new Date()) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${formatWeekday(date)}`;
}
exports.formatCompactMoney = formatCompactMoney;
exports.formatDate = formatDate;
exports.formatMoney = formatMoney;
exports.formatPlanTime = formatPlanTime;
exports.formatTodayHeader = formatTodayHeader;
