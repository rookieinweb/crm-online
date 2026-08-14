"use strict";
const common_vendor = require("../common/vendor.js");
function useTabBar(index) {
  common_vendor.onShow(() => {
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    if (page && typeof page.getTabBar === "function") {
      const tabBar = page.getTabBar();
      if (tabBar && typeof tabBar.setSelected === "function") {
        tabBar.setSelected(index);
      }
    }
  });
}
exports.useTabBar = useTabBar;
