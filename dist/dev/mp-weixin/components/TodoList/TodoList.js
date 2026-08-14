"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (TodoItem + EmptyState)();
}
const TodoItem = () => "../TodoItem/TodoItem.js";
const EmptyState = () => "../EmptyState/EmptyState.js";
const _sfc_main = {
  __name: "TodoList",
  props: {
    items: { type: Array, default: () => [] }
  },
  emits: ["item-click"],
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(__props.items, (item, k0, i0) => {
          return {
            a: item.id,
            b: common_vendor.o(($event) => _ctx.$emit("item-click", item), item.id),
            c: "6cdb44f3-0-" + i0,
            d: common_vendor.p({
              item
            })
          };
        }),
        b: !__props.items.length
      }, !__props.items.length ? {
        c: common_vendor.p({
          text: "暂无待办，继续保持"
        })
      } : {}, {
        d: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        e: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6cdb44f3"]]);
wx.createComponent(Component);
