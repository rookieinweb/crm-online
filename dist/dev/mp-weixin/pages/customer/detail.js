"use strict";
const common_vendor = require("../../common/vendor.js");
const api_customer = require("../../api/customer.js");
const constants_status = require("../../constants/status.js");
const utils_format = require("../../utils/format.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState/EmptyState.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const customer = common_vendor.ref(null);
    const statusInfo = common_vendor.computed(
      () => customer.value ? constants_status.CUSTOMER_STATUS[customer.value.status] || constants_status.CUSTOMER_STATUS.potential : constants_status.CUSTOMER_STATUS.potential
    );
    async function loadDetail() {
      var _a;
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      const id = (_a = page == null ? void 0 : page.options) == null ? void 0 : _a.id;
      if (!id)
        return;
      try {
        customer.value = await api_customer.fetchCustomer(id);
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "加载失败", icon: "none" });
      }
    }
    function callPhone() {
      var _a;
      if (!((_a = customer.value) == null ? void 0 : _a.phone))
        return;
      common_vendor.index.makePhoneCall({ phoneNumber: customer.value.phone });
    }
    function goFollow() {
      var _a;
      if ((_a = customer.value) == null ? void 0 : _a.id) {
        common_vendor.index.setStorageSync("zhike_follow_customer_id", customer.value.id);
      }
      common_vendor.index.switchTab({ url: "/pages/follow/list" });
    }
    common_vendor.onShow(loadDetail);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: customer.value
      }, customer.value ? {
        b: common_vendor.t(customer.value.product_name || customer.value.name),
        c: common_vendor.t(customer.value.level),
        d: common_vendor.t(customer.value.customer_source || "-"),
        e: common_vendor.t(statusInfo.value.label),
        f: common_vendor.t(customer.value.ownerName || "-"),
        g: common_vendor.t(common_vendor.unref(utils_format.formatMoney)(customer.value.dealAmount))
      } : {}, {
        h: customer.value
      }, customer.value ? {
        i: common_vendor.o(callPhone, "98"),
        j: common_vendor.t(customer.value.customer_name || "-"),
        k: common_vendor.t(customer.value.phone || "-"),
        l: common_vendor.t(customer.value.fullAddress || "暂无"),
        m: common_vendor.t(customer.value.remark || "暂无")
      } : {}, {
        n: customer.value
      }, customer.value ? common_vendor.e({
        o: common_vendor.o(goFollow, "99"),
        p: common_vendor.f(customer.value.follows, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.typeLabel),
            b: common_vendor.t(common_vendor.unref(utils_format.formatDate)(item.createdAt, "MM月DD日 HH:mm")),
            c: common_vendor.t(item.content || "暂无内容"),
            d: common_vendor.t(common_vendor.unref(utils_format.formatPlanTime)(item.nextFollowAt)),
            e: item.id
          };
        }),
        q: !customer.value.follows.length
      }, !customer.value.follows.length ? {
        r: common_vendor.p({
          text: "暂无跟进记录"
        })
      } : {}) : {}, {
        s: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        t: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fe1281b8"]]);
wx.createPage(MiniProgramPage);
