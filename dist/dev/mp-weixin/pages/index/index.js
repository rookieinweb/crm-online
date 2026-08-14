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
    const profile = common_vendor.computed(() => userStore.profile);
    const userName = common_vendor.computed(() => userStore.userName);
    const roleLabel = common_vendor.computed(() => constants_roles.ROLE_LABELS[userStore.role]);
    const todayStr = utils_format.formatTodayHeader();
    const stats = common_vendor.ref({
      customerCount: 0,
      todayFollowCount: 0,
      todayVisitCount: 0,
      dealAmount: 0
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
      common_vendor.index.switchTab({ url });
    }
    function goSearch() {
      common_vendor.index.switchTab({ url: "/pages/customer/list" });
    }
    function onTodoClick(item) {
      common_vendor.index.navigateTo({ url: `/pages/customer/detail?id=${item.customerId}` });
    }
    common_vendor.onMounted(loadData);
    common_vendor.onPullDownRefresh(loadData);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(profile.value.teamName),
        b: common_vendor.t(roleLabel.value),
        c: common_vendor.o(goSearch, "0b"),
        d: common_vendor.t(userName.value),
        e: common_vendor.t(common_vendor.unref(todayStr)),
        f: common_vendor.o(($event) => switchTo("/pages/customer/list"), "8b"),
        g: common_vendor.p({
          label: "我的客户",
          icon: "客",
          value: stats.value.customerCount,
          trend: "+8%"
        }),
        h: common_vendor.o(($event) => switchTo("/pages/follow/list"), "67"),
        i: common_vendor.p({
          label: "今日待跟进",
          icon: "跟",
          value: stats.value.todayFollowCount
        }),
        j: common_vendor.o(($event) => switchTo("/pages/visit/today"), "74"),
        k: common_vendor.p({
          label: "今日拜访",
          icon: "访",
          value: stats.value.todayVisitCount
        }),
        l: common_vendor.o(($event) => switchTo("/pages/mine/index"), "41"),
        m: common_vendor.p({
          label: "成交金额",
          icon: "¥",
          value: common_vendor.unref(utils_format.formatCompactMoney)(stats.value.dealAmount),
          trend: "+12%"
        }),
        n: common_vendor.o(($event) => switchTo("/pages/follow/list"), "82"),
        o: common_vendor.o(onTodoClick, "db"),
        p: common_vendor.p({
          items: todos.value
        }),
        q: common_vendor.o(($event) => switchTo("/pages/visit/today"), "03"),
        r: common_vendor.f(visitTasks.value, (task, k0, i0) => {
          return {
            a: common_vendor.t(common_vendor.unref(utils_format.formatDate)(task.planAt, "HH:mm")),
            b: common_vendor.t(task.customerName),
            c: common_vendor.t(task.address),
            d: common_vendor.t(task.status === "done" ? "已签" : "待签"),
            e: common_vendor.n(task.status),
            f: task.id
          };
        }),
        s: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        t: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"]]);
wx.createPage(MiniProgramPage);
