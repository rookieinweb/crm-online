"use strict";
const common_vendor = require("../../common/vendor.js");
const api_customer = require("../../api/customer.js");
const constants_status = require("../../constants/status.js");
const _sfc_main = {
  __name: "form",
  setup(__props) {
    const levels = constants_status.CUSTOMER_LEVELS;
    const statusOptions = Object.keys(constants_status.CUSTOMER_STATUS);
    const statusLabels = statusOptions.map((key) => constants_status.CUSTOMER_STATUS[key].label);
    const statusIndex = common_vendor.ref(0);
    const saving = common_vendor.ref(false);
    const form = common_vendor.reactive({
      name: "",
      contactName: "",
      contactPhone: "",
      industry: "",
      address: "",
      level: "B",
      status: "potential",
      remark: ""
    });
    function onLevelChange(e) {
      form.level = levels[e.detail.value];
    }
    function onStatusChange(e) {
      statusIndex.value = Number(e.detail.value);
      form.status = statusOptions[statusIndex.value];
    }
    async function submit() {
      if (!form.name || !form.contactName || !form.contactPhone) {
        common_vendor.index.showToast({ title: "请填写客户名称、联系人和电话", icon: "none" });
        return;
      }
      saving.value = true;
      try {
        const customer = await api_customer.createCustomer({ ...form });
        common_vendor.index.showToast({ title: "保存成功", icon: "success" });
        setTimeout(() => {
          common_vendor.index.redirectTo({ url: `/pages/customer/detail?id=${customer.id}` });
        }, 250);
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "保存失败", icon: "none" });
      } finally {
        saving.value = false;
      }
    }
    return (_ctx, _cache) => {
      return {
        a: form.name,
        b: common_vendor.o(($event) => form.name = $event.detail.value, "3a"),
        c: form.contactName,
        d: common_vendor.o(($event) => form.contactName = $event.detail.value, "88"),
        e: form.contactPhone,
        f: common_vendor.o(($event) => form.contactPhone = $event.detail.value, "cc"),
        g: form.industry,
        h: common_vendor.o(($event) => form.industry = $event.detail.value, "7f"),
        i: form.address,
        j: common_vendor.o(($event) => form.address = $event.detail.value, "86"),
        k: common_vendor.t(form.level),
        l: common_vendor.unref(levels),
        m: common_vendor.o(onLevelChange, "76"),
        n: common_vendor.t(common_vendor.unref(statusLabels)[statusIndex.value]),
        o: common_vendor.unref(statusLabels),
        p: common_vendor.o(onStatusChange, "78"),
        q: form.remark,
        r: common_vendor.o(($event) => form.remark = $event.detail.value, "90"),
        s: saving.value,
        t: common_vendor.o(submit, "ae"),
        v: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        w: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07cd7443"]]);
wx.createPage(MiniProgramPage);
