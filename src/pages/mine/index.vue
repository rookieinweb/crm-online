<template>
  <view class="mine-page">
    <view class="profile panel">
      <view class="avatar">{{ avatarText }}</view>
      <view class="profile-info">
        <text class="name">{{ displayName }}</text>
        <text class="role">{{ roleLabel }}</text>
      </view>
    </view>

    <view class="metrics">
      <view class="metric">
        <text class="metric-value">{{ stats.effectiveTotal }}</text>
        <text class="metric-label">客户总数</text>
      </view>
      <view class="metric">
        <text class="metric-value">{{ stats.todayFollowNum }}</text>
        <text class="metric-label">今日待跟进</text>
      </view>
      <view class="metric">
        <text class="metric-value">{{ stats.MonthlyTransactionVolume }}</text>
        <text class="metric-label">本月成交</text>
      </view>
    </view>

    <view class="panel menu">
      <view class="menu-item">
        <text>个人信息</text>
        <text class="value">{{ profile.phone || profile.account || '-' }}</text>
      </view>
      <view class="menu-item" @click="goCustomer">
        <text>客户管理</text>
        <text class="arrow">›</text>
      </view>
      <view class="menu-item">
        <text>成交金额</text>
        <text class="value">{{ formatCompactMoney(stats.DealNum || 0) }}</text>
      </view>
    </view>

    <view class="panel menu">
      <view class="menu-item">
        <text>员工管理</text>
        <text class="tip">后台 /user 接口</text>
      </view>
      <view class="menu-item">
        <text>客户分配</text>
        <text class="tip">后台客户负责人字段</text>
      </view>
      <view class="menu-item" @click="logout">
        <text>退出登录</text>
        <text class="arrow">›</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { fetchDashboard } from '@/api/dashboard'
import { ROLE_LABELS } from '@/constants/roles'
import { formatCompactMoney } from '@/utils/format'
import { clearToken } from '@/utils/auth'
import { useTabBar } from '@/composables/useTabBar'

useTabBar(4)

const userStore = useUserStore()
const profile = computed(() => userStore.profile || {})
const displayName = computed(() => profile.value.nickname || profile.value.name || profile.value.account || '销售人员')
const roleLabel = computed(() => ROLE_LABELS[userStore.role] || profile.value.role?.role_name || '销售人员')
const avatarText = computed(() => displayName.value.slice(0, 1))
const stats = ref({
  effectiveTotal: 0,
  todayFollowNum: 0,
  MonthlyTransactionVolume: 0,
  DealNum: 0
})

function goCustomer() {
  uni.switchTab({ url: '/pages/customer/list' })
}

function logout() {
  clearToken()
  userStore.setProfile({})
  uni.reLaunch({ url: '/pages/login/index' })
}

async function loadData() {
  try {
    const data = await fetchDashboard()
    stats.value = { ...stats.value, ...(data.stats || {}) }
  } catch (_) {
    // 个人中心基础信息可离线展示。
  }
}

onShow(loadData)
</script>

<style scoped>
.mine-page { min-height: 100vh; padding: 24rpx 24rpx 148rpx; background: linear-gradient(180deg, #eaf2ff 0%, #f4f6fa 300rpx); }
.panel { background: #ffffff; border: 1rpx solid #e8edf5; border-radius: 16rpx; }
.profile { display: flex; align-items: center; padding: 30rpx 24rpx; margin-bottom: 18rpx; }
.avatar { width: 104rpx; height: 104rpx; border-radius: 24rpx; background: #2563eb; color: #ffffff; font-size: 42rpx; font-weight: 800; display: flex; align-items: center; justify-content: center; margin-right: 22rpx; }
.name { display: block; font-size: 36rpx; font-weight: 800; color: #111827; }
.role { display: block; margin-top: 8rpx; font-size: 24rpx; color: #64748b; }
.metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14rpx; margin-bottom: 18rpx; }
.metric { min-height: 128rpx; border-radius: 16rpx; background: #ffffff; border: 1rpx solid #e8edf5; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.metric-value { font-size: 30rpx; font-weight: 800; color: #111827; }
.metric-label { margin-top: 8rpx; font-size: 22rpx; color: #64748b; }
.menu { padding: 0 24rpx; margin-bottom: 18rpx; }
.menu-item { min-height: 94rpx; display: flex; align-items: center; justify-content: space-between; border-bottom: 1rpx solid #eef2f7; font-size: 28rpx; color: #111827; }
.menu-item:last-child { border-bottom: none; }
.value, .tip { font-size: 24rpx; color: #64748b; }
.arrow { color: #94a3b8; font-size: 42rpx; }
</style>
