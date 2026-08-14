"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const api_dashboard = require("../../api/dashboard.js");
const constants_roles = require("../../constants/roles.js");
const utils_format = require("../../utils/format.js");
const composables_useTabBar = require("../../composables/useTabBar.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    composables_useTabBar.useTabBar(4);
    const userStore = store_user.useUserStore();
    const profile = common_vendor.computed(() => userStore.profile);
    const roleLabel = common_vendor.computed(() => constants_roles.ROLE_LABELS[profile.value.role] || "销售人员");
    const avatarText = common_vendor.computed(() => (profile.value.name || "销").slice(0, 1));
    const stats = common_vendor.ref({ customerCount: 0, dealAmount: 0 });
    function goCustomer() {
      common_vendor.index.switchTab({ url: "/pages/customer/list" });
    }
    common_vendor.onMounted(async () => {
      try {
        const data = await api_dashboard.fetchDashboard();
        stats.value = data.stats;
      } catch (_) {
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(avatarText.value),
        b: common_vendor.t(profile.value.name),
        c: common_vendor.t(profile.value.teamName),
        d: common_vendor.t(roleLabel.value),
        e: common_vendor.t(stats.value.customerCount),
        f: common_vendor.t(common_vendor.unref(utils_format.formatCompactMoney)(stats.value.dealAmount)),
        g: common_vendor.t(profile.value.phone),
        h: common_vendor.o(goCustomer, "6d"),
        i: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        j: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9023ef44"]]);
wx.createPage(MiniProgramPage);
