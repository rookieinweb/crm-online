<template>
  <view class="detail-page">
    <view v-if="customer" class="hero">
      <view class="hero-top">
        <text class="name">{{ customer.name }}</text>
        <text class="level">{{ customer.level }}级</text>
      </view>
      <view class="hero-meta">
        <text>{{ customer.industry }}</text>
        <text>{{ statusInfo.label }}</text>
      </view>
      <view class="owner-row">
        <text>负责人：{{ customer.ownerName }}</text>
        <text>累计成交：{{ formatMoney(customer.dealAmount) }}</text>
      </view>
    </view>

    <view v-if="customer" class="panel">
      <view class="section-header">
        <text class="section-title">联系人</text>
        <text class="link" @click="callPhone">拨号</text>
      </view>
      <view class="info-row">
        <text class="label">姓名</text>
        <text class="value">{{ customer.contactName }}</text>
      </view>
      <view class="info-row">
        <text class="label">电话</text>
        <text class="value">{{ customer.contactPhone }}</text>
      </view>
      <view class="info-row">
        <text class="label">地址</text>
        <text class="value">{{ customer.address }}</text>
      </view>
      <view class="info-row">
        <text class="label">备注</text>
        <text class="value">{{ customer.remark || '暂无' }}</text>
      </view>
    </view>

    <view v-if="customer" class="panel">
      <view class="section-header">
        <text class="section-title">跟进历史</text>
        <text class="link" @click="goFollow">新增</text>
      </view>
      <view v-for="item in customer.follows" :key="item.id" class="timeline">
        <view class="line-dot" />
        <view class="timeline-body">
          <view class="timeline-head">
            <text>{{ FOLLOW_TYPES[item.type] }}</text>
            <text>{{ formatDate(item.createdAt, 'MM月DD日 HH:mm') }}</text>
          </view>
          <text class="content">{{ item.content }}</text>
          <text class="next">下次跟进：{{ formatPlanTime(item.nextFollowAt) }}</text>
        </view>
      </view>
      <EmptyState v-if="!customer.follows.length" text="暂无跟进记录" />
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchCustomer } from '@/api/customer'
import { CUSTOMER_STATUS, FOLLOW_TYPES } from '@/constants/status'
import { formatDate, formatMoney, formatPlanTime } from '@/utils/format'
import EmptyState from '@/components/EmptyState/EmptyState.vue'

const customer = ref(null)
const statusInfo = computed(() =>
  customer.value ? CUSTOMER_STATUS[customer.value.status] || CUSTOMER_STATUS.potential : CUSTOMER_STATUS.potential
)

async function loadDetail() {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  const id = page?.options?.id
  if (!id) return
  try {
    customer.value = await fetchCustomer(id)
  } catch (e) {
    uni.showToast({ title: e.message || '加载失败', icon: 'none' })
  }
}

function callPhone() {
  if (!customer.value?.contactPhone) return
  uni.makePhoneCall({ phoneNumber: customer.value.contactPhone })
}

function goFollow() {
  uni.switchTab({ url: '/pages/follow/list' })
}

onMounted(loadDetail)
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  padding: 24rpx 24rpx 48rpx;
  background: #f4f6fa;
}

.hero,
.panel {
  background: #ffffff;
  border: 1rpx solid #e8edf5;
  border-radius: 16rpx;
  padding: 26rpx;
  margin-bottom: 18rpx;
}

.hero {
  background: #0f172a;
  border-color: #0f172a;
}

.hero-top,
.hero-meta,
.owner-row,
.section-header,
.info-row,
.timeline-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.name {
  flex: 1;
  min-width: 0;
  font-size: 34rpx;
  font-weight: 800;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.level {
  margin-left: 16rpx;
  padding: 6rpx 14rpx;
  border-radius: 10rpx;
  background: #f59e0b;
  color: #ffffff;
  font-size: 22rpx;
  font-weight: 800;
}

.hero-meta,
.owner-row {
  margin-top: 16rpx;
  color: #cbd5e1;
  font-size: 24rpx;
}

.section-header {
  margin-bottom: 8rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 800;
  color: #111827;
}

.link {
  font-size: 24rpx;
  color: #2563eb;
}

.info-row {
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eef2f7;
  align-items: flex-start;
}

.info-row:last-child {
  border-bottom: none;
}

.label {
  width: 120rpx;
  font-size: 24rpx;
  color: #64748b;
}

.value {
  flex: 1;
  text-align: right;
  font-size: 26rpx;
  color: #111827;
}

.timeline {
  display: flex;
  padding: 22rpx 0;
  border-bottom: 1rpx solid #eef2f7;
}

.timeline:last-child {
  border-bottom: none;
}

.line-dot {
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: #2563eb;
  margin: 10rpx 18rpx 0 0;
  flex-shrink: 0;
}

.timeline-body {
  flex: 1;
  min-width: 0;
}

.timeline-head {
  font-size: 24rpx;
  color: #64748b;
}

.content {
  display: block;
  margin-top: 10rpx;
  font-size: 26rpx;
  color: #111827;
  line-height: 1.55;
}

.next {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #2563eb;
}
</style>
