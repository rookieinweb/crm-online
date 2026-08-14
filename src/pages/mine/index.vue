<template>
  <view class="mine-page">
    <view class="profile panel">
      <view class="avatar">{{ avatarText }}</view>
      <view class="profile-info">
        <text class="name">{{ profile.name }}</text>
        <text class="role">{{ profile.teamName }} · {{ roleLabel }}</text>
      </view>
    </view>

    <view class="metrics">
      <view class="metric">
        <text class="metric-value">{{ stats.customerCount }}</text>
        <text class="metric-label">我的客户</text>
      </view>
      <view class="metric">
        <text class="metric-value">{{ formatCompactMoney(stats.dealAmount) }}</text>
        <text class="metric-label">累计成交</text>
      </view>
      <view class="metric">
        <text class="metric-value">92%</text>
        <text class="metric-label">跟进完成率</text>
      </view>
    </view>

    <view class="panel menu">
      <view class="menu-item">
        <text>个人信息</text>
        <text class="value">{{ profile.phone }}</text>
      </view>
      <view class="menu-item" @click="goCustomer">
        <text>客户管理</text>
        <text class="arrow">›</text>
      </view>
      <view class="menu-item">
        <text>我的业绩</text>
        <text class="value">本月 ¥30,000</text>
      </view>
    </view>

    <view class="panel menu">
      <view class="menu-item">
        <text>员工管理</text>
        <text class="tip">主管/管理员</text>
      </view>
      <view class="menu-item">
        <text>客户分配</text>
        <text class="tip">管理员</text>
      </view>
      <view class="menu-item">
        <text>系统配置</text>
        <text class="tip">V1.0预留</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { fetchDashboard } from '@/api/dashboard'
import { ROLE_LABELS } from '@/constants/roles'
import { formatCompactMoney } from '@/utils/format'
import { useTabBar } from '@/composables/useTabBar'

useTabBar(4)

const userStore = useUserStore()
const profile = computed(() => userStore.profile)
const roleLabel = computed(() => ROLE_LABELS[profile.value.role] || '销售人员')
const avatarText = computed(() => (profile.value.name || '销').slice(0, 1))
const stats = ref({ customerCount: 0, dealAmount: 0 })

function goCustomer() {
  uni.switchTab({ url: '/pages/customer/list' })
}

onMounted(async () => {
  try {
    const data = await fetchDashboard()
    stats.value = data.stats
  } catch (_) {
    // 原型页不阻塞个人信息展示。
  }
})
</script>

<style scoped>
.mine-page {
  min-height: 100vh;
  padding: 24rpx 24rpx 148rpx;
  background: linear-gradient(180deg, #eaf2ff 0%, #f4f6fa 300rpx);
}

.panel {
  background: #ffffff;
  border: 1rpx solid #e8edf5;
  border-radius: 16rpx;
}

.profile {
  display: flex;
  align-items: center;
  padding: 30rpx 24rpx;
  margin-bottom: 18rpx;
}

.avatar {
  width: 104rpx;
  height: 104rpx;
  border-radius: 24rpx;
  background: #2563eb;
  color: #ffffff;
  font-size: 42rpx;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 22rpx;
}

.name {
  display: block;
  font-size: 36rpx;
  font-weight: 800;
  color: #111827;
}

.role {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #64748b;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14rpx;
  margin-bottom: 18rpx;
}

.metric {
  min-height: 128rpx;
  border-radius: 16rpx;
  background: #ffffff;
  border: 1rpx solid #e8edf5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.metric-value {
  font-size: 30rpx;
  font-weight: 800;
  color: #111827;
}

.metric-label {
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #64748b;
}

.menu {
  padding: 0 24rpx;
  margin-bottom: 18rpx;
}

.menu-item {
  min-height: 94rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid #eef2f7;
  font-size: 28rpx;
  color: #111827;
}

.menu-item:last-child {
  border-bottom: none;
}

.value,
.tip {
  font-size: 24rpx;
  color: #64748b;
}

.arrow {
  color: #94a3b8;
  font-size: 42rpx;
}
</style>
