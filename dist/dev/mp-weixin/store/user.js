"use strict";
const common_vendor = require("../common/vendor.js");
const utils_auth = require("../utils/auth.js");
const constants_roles = require("../constants/roles.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    profile: utils_auth.getUser() || {
      id: "u001",
      name: "张三",
      phone: "13800000000",
      role: constants_roles.ROLES.SALES,
      avatar: "",
      teamName: "华东销售一组",
      account: ""
    }
  }),
  getters: {
    userName: (state) => {
      var _a;
      return ((_a = state.profile) == null ? void 0 : _a.account) || "销售";
    },
    role: (state) => {
      var _a, _b;
      return ((_b = (_a = state.profile) == null ? void 0 : _a.role) == null ? void 0 : _b.role_code) || constants_roles.ROLES.SALES;
    },
    isManager: (state) => {
      var _a;
      return [constants_roles.ROLES.MANAGER, constants_roles.ROLES.ADMIN].includes((_a = state.profile) == null ? void 0 : _a.role);
    }
  },
  actions: {
    setProfile(profile) {
      this.profile = profile;
      utils_auth.setUser(profile);
    }
  }
});
exports.useUserStore = useUserStore;
