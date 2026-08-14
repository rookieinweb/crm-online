"use strict";
const common_vendor = require("../../common/vendor.js");
const composables_useTabBar = require("../../composables/useTabBar.js");
const constants_status = require("../../constants/status.js");
const utils_format = require("../../utils/format.js");
const api_mock_data = require("../../api/mock/data.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState/EmptyState.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    composables_useTabBar.useTabBar(2);
    const records = common_vendor.ref([]);
    const draft = common_vendor.ref("");
    const type = common_vendor.ref("phone");
    const typeOptions = Object.keys(constants_status.FOLLOW_TYPES).map((value) => ({ value, label: constants_status.FOLLOW_TYPES[value] }));
    async function loadData() {
      records.value = await api_mock_data.mockGetFollowRecords();
    }
    function saveDraft() {
      if (!draft.value.trim()) {
        common_vendor.index.showToast({ title: "请输入跟进内容", icon: "none" });
        return;
      }
      common_vendor.index.showToast({ title: "已保存为前端原型记录", icon: "none" });
      draft.value = "";
    }
    common_vendor.onMounted(loadData);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: draft.value,
        b: common_vendor.o(($event) => draft.value = $event.detail.value, "b5"),
        c: common_vendor.f(common_vendor.unref(typeOptions), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: item.value,
            c: type.value === item.value ? 1 : "",
            d: common_vendor.o(($event) => type.value = item.value, item.value)
          };
        }),
        d: common_vendor.o(saveDraft, "dc"),
        e: common_vendor.t(records.value.length),
        f: common_vendor.f(records.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.customerName),
            b: common_vendor.t(common_vendor.unref(constants_status.FOLLOW_TYPES)[item.type]),
            c: common_vendor.t(item.content),
            d: common_vendor.t(item.creatorName),
            e: common_vendor.t(common_vendor.unref(utils_format.formatDate)(item.createdAt, "MM月DD日 HH:mm")),
            f: common_vendor.t(common_vendor.unref(utils_format.formatPlanTime)(item.nextFollowAt)),
            g: item.id
          };
        }),
        g: !records.value.length
      }, !records.value.length ? {
        h: common_vendor.p({
          text: "暂无跟进记录"
        })
      } : {}, {
        i: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        j: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-73ab4f36"]]);
wx.createPage(MiniProgramPage);
