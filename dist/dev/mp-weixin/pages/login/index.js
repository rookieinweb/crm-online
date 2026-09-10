"use strict";
const common_vendor = require("../../common/vendor.js");
const api_auth = require("../../api/auth.js");
const utils_auth = require("../../utils/auth.js");
const store_user = require("../../store/user.js");
const constants_roles = require("../../constants/roles.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userStore = store_user.useUserStore();
    const loading = common_vendor.ref(false);
    const form = common_vendor.reactive({
      account: "",
      password: "",
      remember: true
    });
    common_vendor.onMounted(() => {
      const saved = common_vendor.index.getStorageSync("zhike_login_account");
      if (saved)
        form.account = saved;
    });
    function normalizeProfile(user = {}) {
      return {
        id: user.id || "",
        account: user.account || form.account,
        name: user.name || user.nickname || user.username || form.account,
        nickname: user.nickname || "",
        phone: user.phone || "",
        role: user.role || constants_roles.ROLES.SALES,
        avatar: user.avatar || "",
        teamName: user.teamName || user.team_name || "销售一组",
        ...user
      };
    }
    async function handleLogin() {
      if (!form.account || !form.password) {
        common_vendor.index.showToast({ title: "请输入账号和密码", icon: "none" });
        return;
      }
      loading.value = true;
      try {
        const res = await api_auth.login({
          account: form.account,
          password: form.password
        });
        const token = (res == null ? void 0 : res.token) || (res == null ? void 0 : res.accessToken) || (res == null ? void 0 : res.access_token) || (res == null ? void 0 : res.jwt) || "";
        if (!token) {
          throw new Error("登录接口未返回 token");
        }
        const profile = normalizeProfile((res == null ? void 0 : res.user) || (res == null ? void 0 : res.userInfo) || (res == null ? void 0 : res.profile) || {});
        utils_auth.setToken(token);
        utils_auth.setUser(profile);
        userStore.setProfile(profile);
        if (form.remember) {
          common_vendor.index.setStorageSync("zhike_login_account", form.account);
        } else {
          common_vendor.index.removeStorageSync("zhike_login_account");
        }
        common_vendor.index.reLaunch({ url: "/pages/index/index" });
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "登录失败", icon: "none" });
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _cache) => {
      return {
        a: form.account,
        b: common_vendor.o(($event) => form.account = $event.detail.value, "db"),
        c: common_vendor.o(handleLogin, "99"),
        d: form.password,
        e: common_vendor.o(($event) => form.password = $event.detail.value, "42"),
        f: form.remember,
        g: common_vendor.o(($event) => form.remember = $event.detail.value, "c8"),
        h: loading.value,
        i: common_vendor.o(handleLogin, "f0"),
        j: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        k: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-45258083"]]);
wx.createPage(MiniProgramPage);
