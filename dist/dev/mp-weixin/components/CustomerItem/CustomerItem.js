"use strict";
const common_vendor = require("../../common/vendor.js");
const constants_status = require("../../constants/status.js");
const utils_format = require("../../utils/format.js");
const _sfc_main = {
  __name: "CustomerItem",
  props: {
    item: { type: Object, required: true }
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const statusInfo = common_vendor.computed(() => constants_status.CUSTOMER_STATUS[props.item.status] || constants_status.CUSTOMER_STATUS.potential);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.item.name),
        b: common_vendor.t(__props.item.level),
        c: common_vendor.n("level-" + __props.item.level),
        d: common_vendor.t(__props.item.contactName),
        e: common_vendor.t(__props.item.contactPhone),
        f: common_vendor.t(statusInfo.value.label),
        g: statusInfo.value.color,
        h: statusInfo.value.bg,
        i: common_vendor.t(__props.item.industry),
        j: __props.item.lastFollowAt
      }, __props.item.lastFollowAt ? {
        k: common_vendor.t(common_vendor.unref(utils_format.formatDate)(__props.item.lastFollowAt))
      } : {}, {
        l: common_vendor.o(($event) => _ctx.$emit("click", __props.item), "50"),
        m: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        n: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-13bd28df"]]);
wx.createComponent(Component);
