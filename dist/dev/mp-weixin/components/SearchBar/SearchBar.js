"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "SearchBar",
  props: {
    modelValue: { type: String, default: "" },
    placeholder: { type: String, default: "搜索" }
  },
  emits: ["update:modelValue", "search"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function onInput(e) {
      emit("update:modelValue", e.detail.value);
    }
    function clear() {
      emit("update:modelValue", "");
      emit("search", "");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.modelValue,
        b: __props.placeholder,
        c: common_vendor.o(onInput, "7d"),
        d: common_vendor.o(($event) => _ctx.$emit("search", __props.modelValue), "18"),
        e: __props.modelValue
      }, __props.modelValue ? {
        f: common_vendor.o(clear, "da")
      } : {}, {
        g: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        h: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e8d9439a"]]);
wx.createComponent(Component);
