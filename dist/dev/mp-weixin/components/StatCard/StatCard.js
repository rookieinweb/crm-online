"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "StatCard",
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: 0 },
    icon: { type: String, default: "·" },
    trend: { type: String, default: "" }
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.icon),
        b: __props.trend
      }, __props.trend ? {
        c: common_vendor.t(__props.trend)
      } : {}, {
        d: common_vendor.t(__props.value),
        e: common_vendor.t(__props.label),
        f: common_vendor.o(($event) => _ctx.$emit("click"), "f7"),
        g: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        h: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-db6632af"]]);
wx.createComponent(Component);
