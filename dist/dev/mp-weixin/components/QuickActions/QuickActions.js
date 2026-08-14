"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "QuickActions",
  setup(__props) {
    function go(url) {
      if (url.includes("/pages/customer/form")) {
        common_vendor.index.navigateTo({ url });
        return;
      }
      common_vendor.index.switchTab({ url });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => go("/pages/customer/form"), "9e"),
        b: common_vendor.o(($event) => go("/pages/follow/list"), "b4"),
        c: common_vendor.o(($event) => go("/pages/visit/today"), "27"),
        d: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        e: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a15f54c9"]]);
wx.createComponent(Component);
