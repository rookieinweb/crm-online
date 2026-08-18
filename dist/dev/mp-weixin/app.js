"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_auth = require("./utils/auth.js");
if (!Math) {
  "./pages/login/index.js";
  "./pages/index/index.js";
  "./pages/customer/list.js";
  "./pages/customer/detail.js";
  "./pages/customer/form.js";
  "./pages/follow/list.js";
  "./pages/visit/today.js";
  "./pages/mine/index.js";
}
const _sfc_main = {
  onLaunch(params) {
    console.log("智客Online销售端启动", params);
    if (utils_auth.getToken() && params.path == "pages/login/index") {
      setTimeout(() => {
        common_vendor.index.reLaunch({ url: "/pages/index/index" });
      }, 0);
    }
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
