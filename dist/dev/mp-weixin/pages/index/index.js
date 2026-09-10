"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const api_dashboard = require("../../api/dashboard.js");
const constants_roles = require("../../constants/roles.js");
const utils_format = require("../../utils/format.js");
const composables_useTabBar = require("../../composables/useTabBar.js");
if (!Math) {
  (StatCard + TodoList + QuickActions)();
}
const StatCard = () => "../../components/StatCard/StatCard.js";
const TodoList = () => "../../components/TodoList/TodoList.js";
const QuickActions = () => "../../components/QuickActions/QuickActions.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    composables_useTabBar.useTabBar(0);
    const userStore = store_user.useUserStore();
    const userName = common_vendor.computed(() => userStore.userName);
    const roleLabel = common_vendor.computed(() => constants_roles.ROLE_LABELS[userStore.role] || "销售人员");
    const todayStr = utils_format.formatTodayHeader();
    const stats = common_vendor.ref({
      effectiveTotal: 0,
      todayCreateNum: 0,
      todayFollowNum: 0,
      MonthlyTransactionVolume: 0,
      DealNum: 0
    });
    const todos = common_vendor.ref([]);
    async function loadData() {
      try {
        const data = await api_dashboard.fetchDashboard();
        stats.value = { ...stats.value, ...data.stats || {} };
        todos.value = data.todos || [];
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "加载失败", icon: "none" });
      } finally {
        common_vendor.index.stopPullDownRefresh();
      }
    }
    function refresh() {
      loadData();
    }
    function switchTo(url) {
      common_vendor.index.switchTab({ url });
    }
    function goSearch() {
      common_vendor.index.switchTab({ url: "/pages/customer/list" });
    }
    function onTodoClick(item) {
      common_vendor.index.navigateTo({ url: `/pages/customer/detail?id=${item.customerId}` });
    }
    common_vendor.onShow(loadData);
    common_vendor.onPullDownRefresh(loadData);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(roleLabel.value),
        b: common_vendor.o(goSearch, "c0"),
        c: common_vendor.t(userName.value),
        d: common_vendor.t(common_vendor.unref(todayStr)),
        e: common_vendor.o(($event) => switchTo("/pages/customer/list"), "5f"),
        f: common_vendor.p({
          label: "客户总数",
          icon: "客",
          value: stats.value.effectiveTotal
        }),
        g: common_vendor.o(($event) => switchTo("/pages/customer/list"), "aa"),
        h: common_vendor.p({
          label: "今日新增",
          icon: "新",
          value: stats.value.todayCreateNum
        }),
        i: common_vendor.o(($event) => switchTo("/pages/follow/list"), "d3"),
        j: common_vendor.p({
          label: "今日待跟进",
          icon: "跟",
          value: stats.value.todayFollowNum
        }),
        k: common_vendor.o(($event) => switchTo("/pages/mine/index"), "4d"),
        l: common_vendor.p({
          label: "成交客户",
          icon: "成",
          value: stats.value.MonthlyTransactionVolume
        }),
        m: common_vendor.o(($event) => switchTo("/pages/follow/list"), "0f"),
        n: common_vendor.o(onTodoClick, "57"),
        o: common_vendor.p({
          items: todos.value
        }),
        p: common_vendor.o(refresh, "e5"),
        q: common_vendor.t(stats.value.MonthlyTransactionVolume || 0),
        r: common_vendor.t(common_vendor.unref(utils_format.formatCompactMoney)(stats.value.DealNum || 0)),
        s: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        t: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"]]);
wx.createPage(MiniProgramPage);
