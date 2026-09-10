"use strict";
const common_vendor = require("../common/vendor.js");
const utils_auth = require("../utils/auth.js");
const constants_roles = require("../constants/roles.js");
function normalizeRole(profile) {
  const role = profile == null ? void 0 : profile.role;
  if (typeof role === "string")
    return role;
  return (role == null ? void 0 : role.role_code) || (role == null ? void 0 : role.code) || constants_roles.ROLES.SALES;
}
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    profile: utils_auth.getUser() || {
      id: "",
      account: "",
      name: "销售人员",
      nickname: "",
      phone: "",
      role: constants_roles.ROLES.SALES,
      avatar: "",
      teamName: "销售一组"
    }
  }),
  getters: {
    userName: (state) => {
      var _a, _b, _c;
      return ((_a = state.profile) == null ? void 0 : _a.nickname) || ((_b = state.profile) == null ? void 0 : _b.name) || ((_c = state.profile) == null ? void 0 : _c.account) || "销售";
    },
    role: (state) => normalizeRole(state.profile),
    isManager: (state) => [constants_roles.ROLES.MANAGER, constants_roles.ROLES.ADMIN].includes(normalizeRole(state.profile))
  },
  actions: {
    setProfile(profile) {
      this.profile = profile;
      utils_auth.setUser(profile);
    }
  }
});
exports.useUserStore = useUserStore;
