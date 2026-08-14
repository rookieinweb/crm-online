"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/customer/list.js";
  "./pages/customer/detail.js";
  "./pages/customer/form.js";
  "./pages/follow/list.js";
  "./pages/visit/today.js";
  "./pages/mine/index.js";
}
const _sfc_main = {
  onLaunch() {
    console.log("智客Online销售端启动");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
