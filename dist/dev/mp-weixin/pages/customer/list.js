"use strict";
const common_vendor = require("../../common/vendor.js");
const api_customer = require("../../api/customer.js");
const composables_useTabBar = require("../../composables/useTabBar.js");
const store_user = require("../../store/user.js");
if (!Math) {
  (SearchBar + CustomerItem + EmptyState)();
}
const SearchBar = () => "../../components/SearchBar/SearchBar.js";
const CustomerItem = () => "../../components/CustomerItem/CustomerItem.js";
const EmptyState = () => "../../components/EmptyState/EmptyState.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    composables_useTabBar.useTabBar(1);
    const userStore = store_user.useUserStore();
    console.log("userStore", userStore.profile);
    common_vendor.computed(() => userStore.profile.id);
    const keyword = common_vendor.ref("");
    const status = common_vendor.ref("all");
    const list = common_vendor.ref([]);
    const total = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    const tabs = [
      { label: "全部", value: "all" },
      { label: "潜在", value: "potential" },
      { label: "跟进中", value: "following" },
      { label: "已成交", value: "deal" },
      { label: "已流失", value: "lost" }
    ];
    async function loadList() {
      loading.value = true;
      try {
        const res = await api_customer.fetchCustomers({ page: 1, size: 10 });
        list.value = res.list;
        total.value = res.total;
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "加载失败", icon: "none" });
      } finally {
        loading.value = false;
        common_vendor.index.stopPullDownRefresh();
      }
    }
    function changeStatus(val) {
      status.value = val;
      loadList();
    }
    function goDetail(item) {
      common_vendor.index.navigateTo({ url: `/pages/customer/detail?id=${item.id}` });
    }
    function goCreate() {
      common_vendor.index.navigateTo({ url: "/pages/customer/form" });
    }
    common_vendor.onMounted(loadList);
    common_vendor.onShow(loadList);
    common_vendor.onPullDownRefresh(loadList);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(loadList, "a7"),
        b: common_vendor.o(($event) => keyword.value = $event, "40"),
        c: common_vendor.p({
          placeholder: "搜索客户名称、联系人、电话",
          modelValue: keyword.value
        }),
        d: common_vendor.f(tabs, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab.label),
            b: tab.value,
            c: status.value === tab.value ? 1 : "",
            d: common_vendor.o(($event) => changeStatus(tab.value), tab.value)
          };
        }),
        e: common_vendor.t(total.value.value),
        f: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: common_vendor.o(goDetail, item.id),
            c: "4c397fa5-1-" + i0,
            d: common_vendor.p({
              item
            })
          };
        }),
        g: !loading.value && !list.value.length
      }, !loading.value && !list.value.length ? {
        h: common_vendor.p({
          text: "暂无客户，点击右下角新增"
        })
      } : {}, {
        i: common_vendor.o(goCreate, "c6"),
        j: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        k: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c397fa5"]]);
wx.createPage(MiniProgramPage);
