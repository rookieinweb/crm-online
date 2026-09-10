"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const api_dashboard = require("../../api/dashboard.js");
const constants_roles = require("../../constants/roles.js");
const utils_format = require("../../utils/format.js");
const utils_auth = require("../../utils/auth.js");
const composables_useTabBar = require("../../composables/useTabBar.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    composables_useTabBar.useTabBar(4);
    const userStore = store_user.useUserStore();
    const profile = common_vendor.computed(() => userStore.profile || {});
    const displayName = common_vendor.computed(() => profile.value.nickname || profile.value.name || profile.value.account || "销售人员");
    const roleLabel = common_vendor.computed(() => {
      var _a;
      return constants_roles.ROLE_LABELS[userStore.role] || ((_a = profile.value.role) == null ? void 0 : _a.role_name) || "销售人员";
    });
    const avatarText = common_vendor.computed(() => displayName.value.slice(0, 1));
    const stats = common_vendor.ref({
      effectiveTotal: 0,
      todayFollowNum: 0,
      MonthlyTransactionVolume: 0,
      DealNum: 0
    });
    function goCustomer() {
      common_vendor.index.switchTab({ url: "/pages/customer/list" });
    }
    function logout() {
      utils_auth.clearToken();
      userStore.setProfile({});
      common_vendor.index.reLaunch({ url: "/pages/login/index" });
    }
    async function loadData() {
      try {
        const data = await api_dashboard.fetchDashboard();
        stats.value = { ...stats.value, ...data.stats || {} };
      } catch (_) {
      }
    }
    common_vendor.onShow(loadData);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(avatarText.value),
        b: common_vendor.t(displayName.value),
        c: common_vendor.t(roleLabel.value),
        d: common_vendor.t(stats.value.effectiveTotal),
        e: common_vendor.t(stats.value.todayFollowNum),
        f: common_vendor.t(stats.value.MonthlyTransactionVolume),
        g: common_vendor.t(profile.value.phone || profile.value.account || "-"),
        h: common_vendor.o(goCustomer, "9e"),
        i: common_vendor.t(common_vendor.unref(utils_format.formatCompactMoney)(stats.value.DealNum || 0)),
        j: common_vendor.o(logout, "ad"),
        k: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        l: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9023ef44"]]);
wx.createPage(MiniProgramPage);
