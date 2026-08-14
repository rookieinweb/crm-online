<template>
  <view class="dashboard">
    <view class="header">
      <view class="header-top">
        <view>
          <text class="brand">智客Online</text>
          <text class="role">{{ profile.teamName }} · {{ roleLabel }}</text>
        </view>
        <view class="search-btn" @click="goSearch">搜</view>
      </view>
      <text class="greeting">{{ userName }}，今天聚焦这几件事</text>
      <text class="date">{{ todayStr }}</text>
    </view>

    <view class="stats-grid">
      <StatCard
        label="我的客户"
        icon="客"
        :value="stats.customerCount"
        trend="+8%"
        @click="switchTo('/pages/customer/list')"
      />
      <StatCard
        label="今日待跟进"
        icon="跟"
        :value="stats.todayFollowCount"
        @click="switchTo('/pages/follow/list')"
      />
      <StatCard
        label="今日拜访"
        icon="访"
        :value="stats.todayVisitCount"
        @click="switchTo('/pages/visit/today')"
      />
      <StatCard
        label="成交金额"
        icon="¥"
        :value="formatCompactMoney(stats.dealAmount)"
        trend="+12%"
        @click="switchTo('/pages/mine/index')"
      />
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
        <text class="section-title">今日拜访</text>
        <text class="section-link" @click="switchTo('/pages/visit/today')">打卡</text>
      </view>
      <view v-for="task in visitTasks" :key="task.id" class="visit-row">
        <view class="visit-time">{{ formatDate(task.planAt, 'HH:mm') }}</view>
        <view class="visit-info">
          <text class="visit-name">{{ task.customerName }}</text>
          <text class="visit-address">{{ task.address }}</text>
        </view>
        <text class="visit-status" :class="task.status">{{ task.status === 'done' ? '已签' : '待签' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { fetchDashboard } from '@/api/dashboard'
import { ROLE_LABELS } from '@/constants/roles'
import { formatCompactMoney, formatDate, formatTodayHeader } from '@/utils/format'
import { useTabBar } from '@/composables/useTabBar'
import StatCard from '@/components/StatCard/StatCard.vue'
import TodoList from '@/components/TodoList/TodoList.vue'
import QuickActions from '@/components/QuickActions/QuickActions.vue'

useTabBar(0)

const userStore = useUserStore()
const profile = computed(() => userStore.profile)
const userName = computed(() => userStore.userName)
const roleLabel = computed(() => ROLE_LABELS[userStore.role])
const todayStr = formatTodayHeader()

const stats = ref({
  customerCount: 0,
  todayFollowCount: 0,
  todayVisitCount: 0,
  dealAmount: 0
})
const todos = ref([])
const visitTasks = ref([])

async function loadData() {
  try {
    const data = await fetchDashboard()
    stats.value = data.stats
    todos.value = data.todos
    visitTasks.value = data.visitTasks || []
  } catch (e) {
    uni.showToast({ title: e.message || '加载失败', icon: 'none' })
  } finally {
    uni.stopPullDownRefresh()
  }
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

onMounted(loadData)
onPullDownRefresh(loadData)
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: 24rpx 24rpx 148rpx;
  background: linear-gradient(180deg, #eaf2ff 0%, #f4f6fa 340rpx);
}

.header {
  margin-bottom: 24rpx;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24rpx;
}

.brand {
  display: block;
  font-size: 38rpx;
  font-weight: 800;
  color: #0f172a;
}

.role {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #64748b;
}

.search-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  background: #ffffff;
  color: #2563eb;
  font-size: 24rpx;
  font-weight: 800;
  line-height: 64rpx;
  text-align: center;
  border: 1rpx solid #dbeafe;
}

.greeting {
  display: block;
  font-size: 36rpx;
  font-weight: 800;
  color: #111827;
}

.date {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #64748b;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  margin-bottom: 24rpx;
}

.section {
  margin-bottom: 24rpx;
}

.panel {
  background: #ffffff;
  border: 1rpx solid #e8edf5;
  border-radius: 16rpx;
  padding: 24rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 800;
  color: #111827;
}

.section-link {
  font-size: 24rpx;
  color: #2563eb;
}

.visit-row {
  display: flex;
  align-items: center;
  padding: 22rpx 0;
  border-bottom: 1rpx solid #eef2f7;
}

.visit-row:last-child {
  border-bottom: none;
}

.visit-time {
  width: 86rpx;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
  border-radius: 12rpx;
  background: #f8fafc;
  color: #334155;
  font-size: 24rpx;
  font-weight: 700;
  margin-right: 18rpx;
}

.visit-info {
  flex: 1;
  min-width: 0;
}

.visit-name,
.visit-address {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.visit-name {
  font-size: 28rpx;
  font-weight: 700;
  color: #111827;
}

.visit-address {
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #64748b;
}

.visit-status {
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  background: #fff7ed;
  color: #c2410c;
  font-size: 22rpx;
  margin-left: 12rpx;
}

.visit-status.done {
  background: #d1fae5;
  color: #047857;
}
</style>
