"use strict";
const common_vendor = require("../../common/vendor.js");
const api_customer = require("../../api/customer.js");
const composables_useTabBar = require("../../composables/useTabBar.js");
if (!Math) {
  (SearchBar + CustomerItem + EmptyState)();
}
const SearchBar = () => "../../components/SearchBar/SearchBar.js";
const CustomerItem = () => "../../components/CustomerItem/CustomerItem.js";
const EmptyState = () => "../../components/EmptyState/EmptyState.js";
const size = 10;
const _sfc_main = {
  __name: "list",
  setup(__props) {
    composables_useTabBar.useTabBar(1);
    const keyword = common_vendor.ref("");
    const status = common_vendor.ref("all");
    const list = common_vendor.ref([]);
    const total = common_vendor.ref(0);
    const page = common_vendor.ref(1);
    const loading = common_vendor.ref(false);
    const tabs = [
      { label: "全部", value: "all" },
      { label: "潜在", value: "potential" },
      { label: "已联系", value: "contacted" },
      { label: "意向", value: "intention" },
      { label: "商谈中", value: "negotiating" },
      { label: "已成交", value: "deal" },
      { label: "已流失", value: "lost" }
    ];
    async function loadList(reset = true) {
      if (loading.value)
        return;
      loading.value = true;
      try {
        const nextPage = reset ? 1 : page.value + 1;
        const res = await api_customer.fetchCustomers({
          page: nextPage,
          size,
          keyword: keyword.value,
          status: status.value
        });
        list.value = reset ? res.list : list.value.concat(res.list);
        total.value = res.total;
        page.value = nextPage;
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "加载失败", icon: "none" });
      } finally {
        loading.value = false;
        common_vendor.index.stopPullDownRefresh();
      }
    }
    function handleSearch() {
      loadList(true);
    }
    function loadMore() {
      loadList(false);
    }
    function changeStatus(val) {
      status.value = val;
      loadList(true);
    }
    function goDetail(item) {
      common_vendor.index.navigateTo({ url: `/pages/customer/detail?id=${item.id}` });
    }
    function goCreate() {
      common_vendor.index.navigateTo({ url: "/pages/customer/form" });
    }
    common_vendor.onShow(() => loadList(true));
    common_vendor.onPullDownRefresh(() => loadList(true));
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleSearch, "7c"),
        b: common_vendor.o(($event) => keyword.value = $event, "67"),
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
        e: common_vendor.t(total.value),
        f: common_vendor.t(page.value),
        g: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: common_vendor.o(goDetail, item.id),
            c: "4c397fa5-1-" + i0,
            d: common_vendor.p({
              item
            })
          };
        }),
        h: !loading.value && !list.value.length
      }, !loading.value && !list.value.length ? {
        i: common_vendor.p({
          text: "暂无客户，点击右下角新增"
        })
      } : {}, {
        j: list.value.length < total.value
      }, list.value.length < total.value ? {
        k: common_vendor.o(loadMore, "4d")
      } : {}, {
        l: common_vendor.o(goCreate, "5a"),
        m: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        n: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c397fa5"]]);
wx.createPage(MiniProgramPage);
