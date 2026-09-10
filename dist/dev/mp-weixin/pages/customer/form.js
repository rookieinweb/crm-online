"use strict";
const common_vendor = require("../../common/vendor.js");
const api_customer = require("../../api/customer.js");
const constants_status = require("../../constants/status.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  __name: "form",
  setup(__props) {
    var _a;
    const userStore = store_user.useUserStore();
    const levels = constants_status.CUSTOMER_LEVELS;
    const sourceOptions = ["微信", "官网", "抖音", "线下"];
    const statusOptions = ["potential", "contacted", "intention", "negotiating", "deal", "lost"];
    const statusLabels = statusOptions.map((key) => constants_status.CUSTOMER_STATUS[key].label);
    const statusIndex = common_vendor.ref(0);
    const saving = common_vendor.ref(false);
    const form = common_vendor.reactive({
      customer_name: "",
      phone: "",
      customer_source: "微信",
      customer_status: "potential",
      customer_level: "B",
      product_name: "",
      province: "",
      city: "",
      address: "",
      owner_id: ((_a = userStore.profile) == null ? void 0 : _a.id) || "",
      remark: "",
      deal_amount: 0
    });
    function onSourceChange(e) {
      form.customer_source = sourceOptions[e.detail.value];
    }
    function onLevelChange(e) {
      form.customer_level = levels[e.detail.value];
    }
    function onStatusChange(e) {
      statusIndex.value = Number(e.detail.value);
      form.customer_status = statusOptions[statusIndex.value];
    }
    async function submit() {
      if (!form.customer_name || !form.phone) {
        common_vendor.index.showToast({ title: "请填写客户姓名和手机号", icon: "none" });
        return;
      }
      saving.value = true;
      try {
        const customer = await api_customer.createCustomer({ ...form });
        common_vendor.index.showToast({ title: "保存成功", icon: "success" });
        setTimeout(() => {
          if (customer == null ? void 0 : customer.id) {
            common_vendor.index.redirectTo({ url: `/pages/customer/detail?id=${customer.id}` });
          } else {
            common_vendor.index.switchTab({ url: "/pages/customer/list" });
          }
        }, 250);
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "保存失败", icon: "none" });
      } finally {
        saving.value = false;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: form.customer_name,
        b: common_vendor.o(($event) => form.customer_name = $event.detail.value, "3c"),
        c: form.phone,
        d: common_vendor.o(($event) => form.phone = $event.detail.value, "54"),
        e: form.product_name,
        f: common_vendor.o(($event) => form.product_name = $event.detail.value, "c0"),
        g: common_vendor.t(form.customer_source),
        h: sourceOptions,
        i: common_vendor.o(onSourceChange, "1d"),
        j: common_vendor.t(form.customer_level || "未选择"),
        k: common_vendor.unref(levels),
        l: common_vendor.o(onLevelChange, "29"),
        m: common_vendor.t(common_vendor.unref(statusLabels)[statusIndex.value]),
        n: common_vendor.unref(statusLabels),
        o: common_vendor.o(onStatusChange, "8d"),
        p: form.province,
        q: common_vendor.o(($event) => form.province = $event.detail.value, "e3"),
        r: form.city,
        s: common_vendor.o(($event) => form.city = $event.detail.value, "23"),
        t: form.address,
        v: common_vendor.o(($event) => form.address = $event.detail.value, "0d"),
        w: form.customer_status === "deal"
      }, form.customer_status === "deal" ? {
        x: form.deal_amount,
        y: common_vendor.o(($event) => form.deal_amount = $event.detail.value, "b8")
      } : {}, {
        z: form.remark,
        A: common_vendor.o(($event) => form.remark = $event.detail.value, "32"),
        B: saving.value,
        C: common_vendor.o(submit, "c2"),
        D: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        E: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07cd7443"]]);
wx.createPage(MiniProgramPage);
