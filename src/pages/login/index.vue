<template>
  <view class="login-page">
    <view class="hero">
      <text class="brand">智客Online</text>
      <text class="desc">企业销售移动端客户管理与拜访管理工具</text>
    </view>

    <view class="panel">
      <text class="title">账号登录</text>

      <view class="field">
        <text class="label">账号</text>
        <input
          v-model="form.username"
          class="input"
          placeholder="请输入账号"
          placeholder-class="placeholder"
          confirm-type="next"
        />
      </view>

      <view class="field">
        <text class="label">密码</text>
        <input
          v-model="form.password"
          class="input"
          password
          placeholder="请输入密码"
          placeholder-class="placeholder"
          confirm-type="done"
          @confirm="handleLogin"
        />
      </view>

      <view class="extra">
        <label class="remember">
          <switch
            :checked="form.remember"
            color="#2563eb"
            @change="form.remember = $event.detail.value"
          />
          <text>记住账号</text>
        </label>
        <!-- <text class="hint">接口参考 `/auth/login`</text> -->
      </view>

      <button class="login-btn" :loading="loading" @click="handleLogin">
        登录
      </button>
    </view>
  </view>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { login } from "@/api/auth";
import { onShow } from "@dcloudio/uni-app";
import { setToken, setUser } from "@/utils/auth";
import { useUserStore } from "@/store/user";
import { ROLES } from "@/constants/roles";

const userStore = useUserStore();
const loading = ref(false);

const form = reactive({
  username: "",
  password: "",
  remember: true,
});

onShow(() => {
  console.log(import.meta.env);
});
onMounted(() => {
  const saved = uni.getStorageSync("zhike_login_username");
  if (saved) form.username = saved;
});

function normalizeLoginPayload(payload) {
  const data = payload?.data !== undefined ? payload.data : payload;
  const token =
    data?.token || data?.accessToken || data?.access_token || data?.jwt || "";
  const profile = data?.user ||
    data?.userInfo ||
    data?.profile ||
    data?.account || {
      id: data?.userId || "u001",
      name: form.account || "销售人员",
      phone: data?.phone || "",
      role: data?.role || ROLES.SALES,
      avatar: "",
      teamName: data?.teamName || "销售一组",
    };

  return { token, profile };
}

async function handleLogin() {
  if (!form.username || !form.password) {
    uni.showToast({ title: "请输入账号和密码", icon: "none" });
    return;
  }

  loading.value = true;
  try {
    const res = await login({
      username: form.username,
      password: form.password,
    });
    console.log("res====================================", res);
    const { token, profile } = normalizeLoginPayload(res);
    if (!token) {
      throw new Error("登录接口未返回 token");
    }
    setToken(token);
    setUser(profile);
    userStore.setProfile(profile);
    if (form.remember) {
      uni.setStorageSync("zhike_login_username", form.username);
    } else {
      uni.removeStorageSync("zhike_login_username");
    }
    uni.reLaunch({ url: "/pages/index/index" });
  } catch (e) {
    console.log("e====================================", e);
    uni.showToast({ title: e.message || "登录失败", icon: "none" });
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  padding: 120rpx 40rpx 48rpx;
  background: linear-gradient(180deg, #eaf2ff 0%, #f4f6fa 60%, #f4f6fa 100%);
}

.hero {
  margin-bottom: 36rpx;
}

.brand {
  display: block;
  font-size: 52rpx;
  font-weight: 800;
  color: #111827;
}

.desc {
  display: block;
  margin-top: 14rpx;
  font-size: 26rpx;
  color: #64748b;
  line-height: 1.5;
}

.panel {
  background: #ffffff;
  border: 1rpx solid #e8edf5;
  border-radius: 20rpx;
  padding: 32rpx 28rpx 36rpx;
  box-shadow: 0 16rpx 36rpx rgba(15, 23, 42, 0.06);
}

.title {
  display: block;
  font-size: 34rpx;
  font-weight: 800;
  color: #111827;
  margin-bottom: 10rpx;
}

.field {
  min-height: 96rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #eef2f7;
}

.field:last-of-type {
  border-bottom: none;
}

.label {
  width: 96rpx;
  font-size: 26rpx;
  color: #475569;
  flex-shrink: 0;
}

.input {
  flex: 1;
  min-width: 0;
  font-size: 28rpx;
  color: #111827;
}

.placeholder {
  color: #94a3b8;
}

.extra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18rpx;
}

.remember {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 24rpx;
  color: #475569;
}

.hint {
  font-size: 22rpx;
  color: #94a3b8;
}

.login-btn {
  margin-top: 28rpx;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 16rpx;
  background: #2563eb;
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 800;
}
</style>
