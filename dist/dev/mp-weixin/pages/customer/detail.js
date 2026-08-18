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
      common_vendor.index.switchTab({ url: "/pages/follow/list" });
    }
    common_vendor.onShow(loadDetail);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: customer.value
      }, customer.value ? {
        b: common_vendor.t(customer.value.customer_no),
        c: common_vendor.t(customer.value.customer_level),
        d: common_vendor.t(customer.value.create_time),
        e: common_vendor.t(statusInfo.value.remark),
        f: common_vendor.t(customer.value.owner.username),
        g: common_vendor.t(common_vendor.unref(utils_format.formatMoney)(customer.value.deal_amount))
      } : {}, {
        h: customer.value
      }, customer.value ? {
        i: common_vendor.o(callPhone, "1f"),
        j: common_vendor.t(customer.value.customer_name),
        k: common_vendor.t(customer.value.phone),
        l: common_vendor.t([customer.value.province, customer.value.city, customer.value.address].filter((v) => v).join("-")),
        m: common_vendor.t(customer.value.remark || "暂无")
      } : {}, {
        n: customer.value
      }, customer.value ? common_vendor.e({
        o: common_vendor.o(goFollow, "7b"),
        p: common_vendor.f(customer.value.follows, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(common_vendor.unref(utils_format.formatDate)(item.follow_time, "MM月DD日 HH:mm")),
            c: common_vendor.t(item.content),
            d: common_vendor.t(common_vendor.unref(utils_format.formatPlanTime)(item.next_follow_time)),
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
