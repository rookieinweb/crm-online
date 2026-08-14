"use strict";
const common_vendor = require("../../common/vendor.js");
const composables_useTabBar = require("../../composables/useTabBar.js");
const utils_format = require("../../utils/format.js");
const api_mock_data = require("../../api/mock/data.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState/EmptyState.js";
const _sfc_main = {
  __name: "today",
  setup(__props) {
    composables_useTabBar.useTabBar(3);
    const tasks = common_vendor.ref([]);
    const records = common_vendor.ref([]);
    async function loadData() {
      const data = await api_mock_data.mockGetVisitTasks();
      tasks.value = data.tasks;
      records.value = data.records;
    }
    async function checkin(task) {
      if (task.status === "done")
        return;
      try {
        const record = await api_mock_data.mockCheckin(task.id);
        records.value.unshift(record);
        task.status = "done";
        common_vendor.index.showToast({ title: record.isValid ? "签到成功" : "签到异常", icon: "none" });
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "签到失败", icon: "none" });
      }
    }
    common_vendor.onMounted(loadData);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(tasks.value.length),
        b: common_vendor.f(tasks.value, (task, k0, i0) => {
          return {
            a: common_vendor.t(common_vendor.unref(utils_format.formatDate)(task.planAt, "HH:mm")),
            b: common_vendor.t(task.customerName),
            c: common_vendor.t(task.address),
            d: common_vendor.t(task.distance),
            e: common_vendor.t(task.status === "done" ? "已签" : "签到"),
            f: common_vendor.n(task.status),
            g: common_vendor.o(($event) => checkin(task), task.id),
            h: task.id
          };
        }),
        c: common_vendor.t(records.value.length),
        d: common_vendor.f(records.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.customerName),
            b: common_vendor.t(item.isValid ? "有效" : "异常"),
            c: !item.isValid ? 1 : "",
            d: common_vendor.t(item.address),
            e: common_vendor.t(common_vendor.unref(utils_format.formatDate)(item.checkinAt, "MM月DD日 HH:mm")),
            f: common_vendor.t(item.distance),
            g: common_vendor.t(item.remark),
            h: item.id
          };
        }),
        e: !records.value.length
      }, !records.value.length ? {
        f: common_vendor.p({
          text: "暂无拜访记录"
        })
      } : {}, {
        g: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        h: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-85abffd6"]]);
wx.createPage(MiniProgramPage);
