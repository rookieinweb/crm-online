<template>
  <view class="dashboard">
    <view class="header">
      <view class="header-top">
        <view>
          <text class="brand">智客Online</text>
          <text class="role">{{ roleLabel }}</text>
        </view>
        <view class="search-btn" @click="goSearch">搜</view>
      </view>
      <text class="greeting">{{ userName }}，今天聚焦这几件事</text>
      <text class="date">{{ todayStr }}</text>
    </view>

    <view class="stats-grid">
      <StatCard label="客户总数" icon="客" :value="stats.effectiveTotal" @click="switchTo('/pages/customer/list')" />
      <StatCard label="今日新增" icon="新" :value="stats.todayCreateNum" @click="switchTo('/pages/customer/list')" />
      <StatCard label="今日待跟进" icon="跟" :value="stats.todayFollowNum" @click="switchTo('/pages/follow/list')" />
      <StatCard label="成交客户" icon="成" :value="stats.MonthlyTransactionVolume" @click="switchTo('/pages/mine/index')" />
    </view>

    <view class="section panel">
      <view class="section-header">
        <text class="section-title">今日待办</text>
        <text class="section-link" @click="switchTo('/pages/follow/list')">全部</text>
      </view>
      <TodoList :items="todos" @item-click="onTodoClick" />
    </view>

    <view class="section">
      <view class="section-header">
        <text class="section-title">快捷操作</text>
      </view>
      <QuickActions />
    </view>

    <view class="section panel">
      <view class="section-header">
        <text class="section-title">销售概览</text>
        <text class="section-link" @click="refresh">刷新</text>
      </view>
      <view class="overview-row">
        <text>本月成交</text>
        <text>{{ stats.MonthlyTransactionVolume || 0 }} 个客户</text>
      </view>
      <view class="overview-row">
        <text>成交金额</text>
        <text>{{ formatCompactMoney(stats.DealNum || 0) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onPullDownRefresh, onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { fetchDashboard } from '@/api/dashboard'
import { ROLE_LABELS } from '@/constants/roles'
import { formatCompactMoney, formatTodayHeader } from '@/utils/format'
import { useTabBar } from '@/composables/useTabBar'
import StatCard from '@/components/StatCard/StatCard.vue'
import TodoList from '@/components/TodoList/TodoList.vue'
import QuickActions from '@/components/QuickActions/QuickActions.vue'

useTabBar(0)

const userStore = useUserStore()
const userName = computed(() => userStore.userName)
const roleLabel = computed(() => ROLE_LABELS[userStore.role] || '销售人员')
const todayStr = formatTodayHeader()

const stats = ref({
  effectiveTotal: 0,
  todayCreateNum: 0,
  todayFollowNum: 0,
  MonthlyTransactionVolume: 0,
  DealNum: 0
})
const todos = ref([])

async function loadData() {
  try {
    const data = await fetchDashboard()
    stats.value = { ...stats.value, ...(data.stats || {}) }
    todos.value = data.todos || []
  } catch (e) {
    uni.showToast({ title: e.message || '加载失败', icon: 'none' })
  } finally {
    uni.stopPullDownRefresh()
  }
}

function refresh() {
  loadData()
}

function switchTo(url) {
  uni.switchTab({ url })
}

function goSearch() {
  uni.switchTab({ url: '/pages/customer/list' })
}

function onTodoClick(item) {
  uni.navigateTo({ url: `/pages/customer/detail?id=${item.customerId}` })
}

onShow(loadData)
onPullDownRefresh(loadData)
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: 24rpx 24rpx 148rpx;
  background: linear-gradient(180deg, #eaf2ff 0%, #f4f6fa 340rpx);
}
.header { margin-bottom: 24rpx; }
.header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24rpx; }
.brand { display: block; font-size: 38rpx; font-weight: 800; color: #0f172a; }
.role { display: block; margin-top: 8rpx; font-size: 24rpx; color: #64748b; }
.search-btn { width: 64rpx; height: 64rpx; border-radius: 16rpx; background: #ffffff; color: #2563eb; font-size: 24rpx; font-weight: 800; line-height: 64rpx; text-align: center; border: 1rpx solid #dbeafe; }
.greeting { display: block; font-size: 36rpx; font-weight: 800; color: #111827; }
.date { display: block; margin-top: 8rpx; font-size: 24rpx; color: #64748b; }
.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16rpx; margin-bottom: 24rpx; }
.section { margin-bottom: 24rpx; }
.panel { background: #ffffff; border: 1rpx solid #e8edf5; border-radius: 16rpx; padding: 24rpx; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8rpx; }
.section-title { font-size: 30rpx; font-weight: 800; color: #111827; }
.section-link { font-size: 24rpx; color: #2563eb; }
.overview-row { display: flex; justify-content: space-between; align-items: center; padding: 22rpx 0; border-bottom: 1rpx solid #eef2f7; font-size: 26rpx; color: #334155; }
.overview-row:last-child { border-bottom: none; }
</style>
