"use strict";
const common_vendor = require("../../common/vendor.js");
const api_auth = require("../../api/auth.js");
const utils_auth = require("../../utils/auth.js");
const store_user = require("../../store/user.js");
const constants_roles = require("../../constants/roles.js");
var define_import_meta_env_default = { VITE_API_URL: "http://127.0.0.1:7001", VITE_CJS_IGNORE_WARNING: "true", VITE_ROOT_DIR: "D:\\demo\\wx-uni", VITE_USER_NODE_ENV: "development", BASE_URL: "/", MODE: "development", DEV: true, PROD: false, SSR: false };
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userStore = store_user.useUserStore();
    const loading = common_vendor.ref(false);
    const form = common_vendor.reactive({
      username: "",
      password: "",
      remember: true
    });
    common_vendor.onShow(() => {
      console.log(define_import_meta_env_default);
    });
    common_vendor.onMounted(() => {
      const saved = common_vendor.index.getStorageSync("zhike_login_username");
      if (saved)
        form.username = saved;
    });
    function normalizeLoginPayload(payload) {
      const data = (payload == null ? void 0 : payload.data) !== void 0 ? payload.data : payload;
      const token = (data == null ? void 0 : data.token) || (data == null ? void 0 : data.accessToken) || (data == null ? void 0 : data.access_token) || (data == null ? void 0 : data.jwt) || "";
      const profile = (data == null ? void 0 : data.user) || (data == null ? void 0 : data.userInfo) || (data == null ? void 0 : data.profile) || (data == null ? void 0 : data.account) || {
        id: (data == null ? void 0 : data.userId) || "u001",
        name: form.account || "销售人员",
        phone: (data == null ? void 0 : data.phone) || "",
        role: (data == null ? void 0 : data.role) || constants_roles.ROLES.SALES,
        avatar: "",
        teamName: (data == null ? void 0 : data.teamName) || "销售一组"
      };
      return { token, profile };
    }
    async function handleLogin() {
      if (!form.username || !form.password) {
        common_vendor.index.showToast({ title: "请输入账号和密码", icon: "none" });
        return;
      }
      loading.value = true;
      try {
        const res = await api_auth.login({
          username: form.username,
          password: form.password
        });
        console.log("res====================================", res);
        const { token, profile } = normalizeLoginPayload(res);
        if (!token) {
          throw new Error("登录接口未返回 token");
        }
        utils_auth.setToken(token);
        utils_auth.setUser(profile);
        userStore.setProfile(profile);
        if (form.remember) {
          common_vendor.index.setStorageSync("zhike_login_username", form.username);
        } else {
          common_vendor.index.removeStorageSync("zhike_login_username");
        }
        common_vendor.index.reLaunch({ url: "/pages/index/index" });
      } catch (e) {
        console.log("e====================================", e);
        common_vendor.index.showToast({ title: e.message || "登录失败", icon: "none" });
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _cache) => {
      return {
        a: form.username,
        b: common_vendor.o(($event) => form.username = $event.detail.value, "ec"),
        c: common_vendor.o(handleLogin, "b8"),
        d: form.password,
        e: common_vendor.o(($event) => form.password = $event.detail.value, "da"),
        f: form.remember,
        g: common_vendor.o(($event) => form.remember = $event.detail.value, "23"),
        h: loading.value,
        i: common_vendor.o(handleLogin, "bb"),
        j: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
        k: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-45258083"]]);
wx.createPage(MiniProgramPage);
