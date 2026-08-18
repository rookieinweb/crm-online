"use strict";
const common_vendor = require("../../common/vendor.js");
const composables_useTabBar = require("../../composables/useTabBar.js");
const utils_format = require("../../utils/format.js");
const utils_location = require("../../utils/location.js");
const api_mock_data = require("../../api/mock/data.js");
if (!Math) {
  EmptyState();
}
const EmptyState = () => "../../components/EmptyState/EmptyState.js";
const _sfc_main = {
  __name: "today",
  setup(__props) {
    composables_useTabBar.useTabBar(3);
    const tasks = common_vendor.ref([]);
    const records = common_vendor.ref([]);
    const checkingId = common_vendor.ref("");
    const currentLocation = common_vendor.ref({});
    async function loadData() {
      const data = await api_mock_data.mockGetVisitTasks();
      tasks.value = data.tasks.map((task) => {
        const distance = utils_location.calcDistance(
          currentLocation.value.latitude,
          currentLocation.value.longitude,
          task.latitude,
          task.longitude
        );
        return {
          ...task,
          distance
        };
      });
      records.value = data.records;
      console.log("records", tasks.value);
    }
    function getCheckinText(task) {
      if (task.status === "done")
        return "已签";
      if (checkingId.value === task.id)
        return "定位中";
      return "签到";
    }
    async function getCurrentLocationHandler() {
      currentLocation.value = await utils_location.getCurrentLocation();
    }
    async function checkin(task) {
      if (task.status === "done" || checkingId.value)
        return;
      checkingId.value = task.id;
      common_vendor.index.showLoading({ title: "定位中" });
      try {
        const customerLocation = await utils_location.resolveCustomerLocation(task);
        const currentLocation2 = await utils_location.getCurrentLocation();
        const distance = utils_location.calcDistance(
          currentLocation2.latitude,
          currentLocation2.longitude,
          customerLocation.latitude,
          customerLocation.longitude
        );
        const isValid = utils_location.isValidCheckinDistance(distance);
        task.latitude = customerLocation.latitude;
        task.longitude = customerLocation.longitude;
        task.distance = distance;
        if (!isValid) {
          common_vendor.index.showToast({
            title: `超出${utils_location.CHECKIN_MAX_DISTANCE / 1e3}公里范围，当前约${distance}米`,
            icon: "none"
          });
          return;
        }
        const record = await api_mock_data.mockCheckin(task.id, {
          customerLatitude: customerLocation.latitude,
          customerLongitude: customerLocation.longitude,
          currentLatitude: currentLocation2.latitude,
          currentLongitude: currentLocation2.longitude,
          distance,
          isValid,
          remark: "定位范围内完成公司签到"
        });
        records.value.unshift(record);
        task.status = "done";
        common_vendor.index.showToast({ title: "签到成功", icon: "success" });
      } catch (e) {
        console.log("e===================", e);
        common_vendor.index.showToast({ title: e.message || "签到失败", icon: "none" });
      } finally {
        checkingId.value = "";
        common_vendor.index.hideLoading();
      }
    }
    common_vendor.onShow(async () => {
      await getCurrentLocationHandler();
      loadData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(tasks.value.length),
        b: common_vendor.f(tasks.value, (task, k0, i0) => {
          return {
            a: common_vendor.t(common_vendor.unref(utils_format.formatDate)(task.planAt, "HH:mm")),
            b: common_vendor.t(task.customerName),
            c: common_vendor.t(task.address),
            d: common_vendor.t(task.distance == null ? "待获取当前位置" : `距客户公司约 ${task.distance} 米`),
            e: common_vendor.t(getCheckinText(task)),
            f: common_vendor.n(task.status),
            g: common_vendor.n({
              loading: checkingId.value === task.id
            }),
            h: common_vendor.o(($event) => checkin(task), task.id),
            i: task.id
          };
        }),
        c: common_vendor.t(records.value.length),
        d: common_vendor.f(records.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.customerName),
            b: common_vendor.t(item.isValid ? "有效" : "异常"),
            c: !item.isValid ? 1 : "",
            d: common_vendor.t(item.address),
            e: common_vendor.t(common_vendor.unref(utils_format.formatDate)(item.checkinAt, "MM月DD日 HH:mm")),
            f: common_vendor.t(item.distance),
            g: common_vendor.t(item.remark),
            h: item.id
          };
        }),
        e: !records.value.length
      }, !records.value.length ? {
        f: common_vendor.p({
          text: "暂无拜访记录"
        })
      } : {}, {
        g: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        h: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-85abffd6"]]);
wx.createPage(MiniProgramPage);
