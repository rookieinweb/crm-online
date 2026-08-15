"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const api_dashboard = require("../../api/dashboard.js");
const constants_roles = require("../../constants/roles.js");
const utils_format = require("../../utils/format.js");
const composables_useTabBar = require("../../composables/useTabBar.js");
const api_auth = require("../../api/auth.js");
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
    common_vendor.computed(() => userStore.profile);
    const userName = common_vendor.computed(() => userStore.userName);
    const roleLabel = common_vendor.computed(() => constants_roles.ROLE_LABELS[userStore.role]);
    const todayStr = utils_format.formatTodayHeader();
    const stats = common_vendor.ref({
      effectiveTotal: 0,
      todayCreateNum: 0,
      todayFollowNum: 0,
      MonthlyTransactionVolume: 0
    });
    const todos = common_vendor.ref([]);
    const visitTasks = common_vendor.ref([]);
    async function loadData() {
      try {
        const data = await api_dashboard.fetchDashboard();
        stats.value = data.stats;
        todos.value = data.todos;
        visitTasks.value = data.visitTasks || [];
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "加载失败", icon: "none" });
      } finally {
        common_vendor.index.stopPullDownRefresh();
      }
    }
    function switchTo(url) {
      console.log("url=========================>", url);
      common_vendor.index.switchTab({ url });
    }
    function goSearch() {
      common_vendor.index.switchTab({ url: "/pages/customer/list" });
    }
    function onTodoClick(item) {
      common_vendor.index.navigateTo({ url: `/pages/customer/detail?id=${item.customerId}` });
    }
    common_vendor.onShow(() => {
      console.log("process.env", "/");
      fetchDashboardOverview();
    });
    async function fetchDashboardOverview() {
      let res = await api_auth.getDashboardOverview({});
      stats.value = res;
      console.log("res", res);
    }
    common_vendor.onMounted(loadData);
    common_vendor.onPullDownRefresh(loadData);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(roleLabel.value),
        b: common_vendor.o(goSearch, "c0"),
        c: common_vendor.t(userName.value),
        d: common_vendor.t(common_vendor.unref(todayStr)),
        e: common_vendor.o(($event) => switchTo("/pages/customer/list"), "04"),
        f: common_vendor.p({
          label: "我的客户",
          icon: "客",
          value: stats.value.effectiveTotal,
          trend: "+8%"
        }),
        g: common_vendor.o(($event) => switchTo("/pages/follow/list"), "78"),
        h: common_vendor.p({
          label: "今日待跟进",
          icon: "跟",
          value: stats.value.todayFollowNum
        }),
        i: common_vendor.o(($event) => switchTo("/pages/visit/today"), "e9"),
        j: common_vendor.p({
          label: "今日拜访",
          icon: "访",
          value: stats.value.todayVisitCount
        }),
        k: common_vendor.o(($event) => switchTo("/pages/mine/index"), "a9"),
        l: common_vendor.p({
          label: "成交金额",
          icon: "¥",
          value: common_vendor.unref(utils_format.formatCompactMoney)(stats.value.dealAmount),
          trend: "+12%"
        }),
        m: common_vendor.o(($event) => switchTo("/pages/follow/list"), "b9"),
        n: common_vendor.o(onTodoClick, "fd"),
        o: common_vendor.p({
          items: todos.value
        }),
        p: common_vendor.o(($event) => switchTo("/pages/visit/today"), "d5"),
        q: common_vendor.f(visitTasks.value, (task, k0, i0) => {
          return {
            a: common_vendor.t(common_vendor.unref(utils_format.formatDate)(task.planAt, "HH:mm")),
            b: common_vendor.t(task.customerName),
            c: common_vendor.t(task.address),
            d: common_vendor.t(task.status === "done" ? "已签" : "待签"),
            e: common_vendor.n(task.status),
            f: task.id
          };
        }),
        r: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        s: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"]]);
wx.createPage(MiniProgramPage);
