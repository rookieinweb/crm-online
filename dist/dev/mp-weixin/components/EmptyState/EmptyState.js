"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "EmptyState",
  props: {
    text: { type: String, default: "暂无数据" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.text),
        b: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        c: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00c0c74e"]]);
wx.createComponent(Component);
