"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_format = require("../../utils/format.js");
const _sfc_main = {
  __name: "TodoItem",
  props: {
    item: { type: Object, required: true }
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(__props.item.priority),
        b: common_vendor.t(__props.item.customerName),
        c: common_vendor.t(__props.item.priority === "high" ? "今天" : "计划"),
        d: __props.item.lastContactAt
      }, __props.item.lastContactAt ? {
        e: common_vendor.t(common_vendor.unref(utils_format.formatDate)(__props.item.lastContactAt))
      } : {}, {
        f: __props.item.planTime
      }, __props.item.planTime ? {
        g: common_vendor.t(common_vendor.unref(utils_format.formatPlanTime)(__props.item.planTime))
      } : {}, {
        h: common_vendor.o(($event) => _ctx.$emit("click", __props.item), "56"),
        i: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        j: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f97f26c4"]]);
wx.createComponent(Component);
