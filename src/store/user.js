import { defineStore } from "pinia";
import { getUser, setUser } from "@/utils/auth";
import { ROLES } from "@/constants/roles";

export const useUserStore = defineStore("user", {
  state: () => ({
    profile: getUser() || {
      id: "u001",
      name: "张三",
      phone: "13800000000",
      role: ROLES.SALES,
      avatar: "",
      teamName: "华东销售一组",
      account: "",
    },
  }),
  getters: {
    userName: (state) => state.profile?.account || "销售",
    role: (state) => state.profile?.role?.role_code || ROLES.SALES,
    isManager: (state) =>
      [ROLES.MANAGER, ROLES.ADMIN].includes(state.profile?.role),
  },
  actions: {
    setProfile(profile) {
      this.profile = profile;
      setUser(profile);
    },
  },
});
