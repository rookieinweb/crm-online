"use strict";
const common_vendor = require("../../common/vendor.js");
const api_customer = require("../../api/customer.js");
const constants_status = require("../../constants/status.js");
const utils_format = require("../../utils/format.js");
const composables_useTabBar = require("../../composables/useTabBar.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState/EmptyState.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    composables_useTabBar.useTabBar(2);
    const customers = common_vendor.ref([]);
    const selectedCustomerId = common_vendor.ref("");
    const selectedCustomerName = common_vendor.ref("");
    const records = common_vendor.ref([]);
    const draft = common_vendor.ref("");
    const type = common_vendor.ref("电话");
    const saving = common_vendor.ref(false);
    const typeOptions = ["电话", "微信", "拜访"].map((value) => ({ value, label: value }));
    const customerPickerLabels = common_vendor.computed(() => customers.value.map((item) => item.product_name || item.name || item.customer_name || `客户${item.id}`));
    async function loadCustomers() {
      const res = await api_customer.fetchCustomers({ page: 1, size: 50, status: "all" });
      customers.value = res.list || [];
      const cachedId = common_vendor.index.getStorageSync("zhike_follow_customer_id");
      if (cachedId && customers.value.some((item) => String(item.id) === String(cachedId))) {
        selectCustomer(cachedId);
        common_vendor.index.removeStorageSync("zhike_follow_customer_id");
      } else if (!selectedCustomerId.value && customers.value.length) {
        selectCustomer(customers.value[0].id);
      } else if (selectedCustomerId.value) {
        selectCustomer(selectedCustomerId.value);
      }
    }
    async function selectCustomer(id) {
      selectedCustomerId.value = id;
      const customer = customers.value.find((item) => String(item.id) === String(id));
      selectedCustomerName.value = (customer == null ? void 0 : customer.product_name) || (customer == null ? void 0 : customer.name) || (customer == null ? void 0 : customer.customer_name) || "";
      await loadRecords(id);
    }
    async function loadRecords(id) {
      if (!id) {
        records.value = [];
        return;
      }
      try {
        const detail = await api_customer.fetchCustomer(id);
        selectedCustomerName.value = detail.product_name || detail.name || detail.customer_name || selectedCustomerName.value;
        records.value = detail.follows || [];
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "跟进记录加载失败", icon: "none" });
      }
    }
    function onCustomerChange(e) {
      const customer = customers.value[Number(e.detail.value)];
      if (customer == null ? void 0 : customer.id)
        selectCustomer(customer.id);
    }
    async function saveDraft() {
      if (!selectedCustomerId.value) {
        common_vendor.index.showToast({ title: "请选择客户", icon: "none" });
        return;
      }
      if (!draft.value.trim()) {
        common_vendor.index.showToast({ title: "请输入跟进内容", icon: "none" });
        return;
      }
      saving.value = true;
      try {
        await api_customer.createFollow({
          customerId: selectedCustomerId.value,
          type: type.value,
          title: type.value,
          content: draft.value.trim(),
          result: "",
          nextFollowAt: ""
        });
        common_vendor.index.showToast({ title: "跟进记录已保存", icon: "success" });
        draft.value = "";
        await loadRecords(selectedCustomerId.value);
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "保存失败", icon: "none" });
      } finally {
        saving.value = false;
      }
    }
    common_vendor.onShow(loadCustomers);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(selectedCustomerName.value || "请选择客户"),
        b: customerPickerLabels.value,
        c: common_vendor.o(onCustomerChange, "9d"),
        d: draft.value,
        e: common_vendor.o(($event) => draft.value = $event.detail.value, "d5"),
        f: common_vendor.f(common_vendor.unref(typeOptions), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: item.value,
            c: type.value === item.value ? 1 : "",
            d: common_vendor.o(($event) => type.value = item.value, item.value)
          };
        }),
        g: saving.value,
        h: common_vendor.o(saveDraft, "49"),
        i: common_vendor.t(records.value.length),
        j: common_vendor.f(records.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.customerName || selectedCustomerName.value),
            b: common_vendor.t(item.typeLabel || common_vendor.unref(constants_status.FOLLOW_TYPES)[item.type] || item.type),
            c: common_vendor.t(item.content || "暂无内容"),
            d: common_vendor.t(item.creatorName || "-"),
            e: common_vendor.t(common_vendor.unref(utils_format.formatDate)(item.createdAt, "MM月DD日 HH:mm")),
            f: common_vendor.t(common_vendor.unref(utils_format.formatPlanTime)(item.nextFollowAt)),
            g: item.id
          };
        }),
        k: !records.value.length
      }, !records.value.length ? {
        l: common_vendor.p({
          text: "暂无跟进记录"
        })
      } : {}, {
        m: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        n: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-73ab4f36"]]);
wx.createPage(MiniProgramPage);
