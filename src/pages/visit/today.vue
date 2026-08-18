<template>
  <view class="visit-page">
    <view class="map-panel">
      <text class="map-title">客户定位打卡</text>
      <text class="map-sub">根据客户地址解析公司经纬度，再获取微信当前位置；进入客户公司 1 公里范围内才可签到成功。</text>
      <view class="map-grid">
        <text>重新定位</text>
      </view>
    </view>

    <view class="panel">
      <view class="section-header">
        <text class="section-title">今日任务</text>
        <text class="count">{{ tasks.length }} 个</text>
      </view>
      <view v-for="task in tasks" :key="task.id" class="task">
        <view class="time">{{ formatDate(task.planAt, 'HH:mm') }}</view>
        <view class="task-body">
          <text class="customer">{{ task.customerName }}</text>
          <text class="address">{{ task.address }}</text>
          <text class="distance">
            {{ task.distance == null ? '待获取当前位置' : `距客户公司约 ${task.distance} 米` }}
          </text>
        </view>
        <button class="check-btn" :class="[task.status, { loading: checkingId === task.id }]" @click="checkin(task)">
          {{ getCheckinText(task) }}
        </button>
      </view>
    </view>

    <view class="panel">
      <view class="section-header">
        <text class="section-title">拜访记录</text>
        <text class="count">{{ records.length }} 条</text>
      </view>
      <view v-for="item in records" :key="item.id" class="record">
        <view class="record-head">
          <text class="customer">{{ item.customerName }}</text>
          <text class="valid" :class="{ invalid: !item.isValid }">{{ item.isValid ? '有效' : '异常' }}</text>
        </view>
        <text class="address">{{ item.address }}</text>
        <text class="record-foot">{{ formatDate(item.checkinAt, 'MM月DD日 HH:mm') }} · {{ item.distance }}米 · {{ item.remark }}</text>
      </view>
      <EmptyState v-if="!records.length" text="暂无拜访记录" />
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTabBar } from '@/composables/useTabBar'
import { formatDate } from '@/utils/format'
import {
  CHECKIN_MAX_DISTANCE,
  calcDistance,
  getCurrentLocation,
  isValidCheckinDistance,
  resolveCustomerLocation
} from '@/utils/location'
import { mockCheckin, mockGetVisitTasks } from '@/api/mock/data'
import EmptyState from '@/components/EmptyState/EmptyState.vue'
import { onShow,onLoad, onPullDownRefresh } from '@dcloudio/uni-app'

useTabBar(3)

const tasks = ref([])
const records = ref([])
const checkingId = ref('')
const currentLocation = ref({})
async function loadData() {
  const data = await mockGetVisitTasks()
  tasks.value = data.tasks.map(task => {
    const distance = calcDistance(
      currentLocation.value.latitude,
      currentLocation.value.longitude,
      task.latitude,
      task.longitude
    )
    return {
      ...task,
      distance
    }
  })
  records.value = data.records
  console.log('records',tasks.value)
}

function getCheckinText(task) {
  if (task.status === 'done') return '已签'
  if (checkingId.value === task.id) return '定位中'
  return '签到'
}
async function getCurrentLocationHandler() {
  currentLocation.value = await getCurrentLocation()
}
async function checkin(task) {
  if (task.status === 'done' || checkingId.value) return

  checkingId.value = task.id
  uni.showLoading({ title: '定位中' })

  try {
    const customerLocation = await resolveCustomerLocation(task)
    const currentLocation = await getCurrentLocation()
    const distance = calcDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      customerLocation.latitude,
      customerLocation.longitude
    )
    const isValid = isValidCheckinDistance(distance)

    task.latitude = customerLocation.latitude
    task.longitude = customerLocation.longitude
    task.distance = distance

    if (!isValid) {
      uni.showToast({
        title: `超出${CHECKIN_MAX_DISTANCE / 1000}公里范围，当前约${distance}米`,
        icon: 'none'
      })
      return
    }

    const record = await mockCheckin(task.id, {
      customerLatitude: customerLocation.latitude,
      customerLongitude: customerLocation.longitude,
      currentLatitude: currentLocation.latitude,
      currentLongitude: currentLocation.longitude,
      distance,
      isValid,
      remark: '定位范围内完成公司签到'
    })
    records.value.unshift(record)
    task.status = 'done'
    uni.showToast({ title: '签到成功', icon: 'success' })
  } catch (e) {
    console.log('e===================',e)
    uni.showToast({ title: e.message || '签到失败', icon: 'none' })
  } finally {
    checkingId.value = ''
    uni.hideLoading()
  }
}

onShow(async () => {
  await getCurrentLocationHandler()
  loadData();
})
</script>

<style scoped>
.visit-page {
  min-height: 100vh;
  padding: 24rpx 24rpx 148rpx;
  background: #f4f6fa;
}

.map-panel,
.panel {
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 18rpx;
}

.map-panel {
  background: #0f172a;
  color: #ffffff;
}
.map-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12rpx;
  margin-top: 22rpx;
}

.map-grid text {
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  border-radius: 12rpx;
  background: rgba(255, 255, 255, 0.12);
  font-size: 24rpx;
  font-weight: 700;
}
.panel {
  background: #ffffff;
  border: 1rpx solid #e8edf5;
}

.map-title {
  display: block;
  font-size: 34rpx;
  font-weight: 800;
}

.map-sub {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #cbd5e1;
  line-height: 1.5;
}

.section-header,
.task,
.record-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-header {
  margin-bottom: 8rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 800;
  color: #111827;
}

.count {
  font-size: 22rpx;
  color: #64748b;
}

.task,
.record {
  padding: 22rpx 0;
  border-bottom: 1rpx solid #eef2f7;
}

.task:last-child,
.record:last-child {
  border-bottom: none;
}

.time {
  width: 84rpx;
  height: 52rpx;
  border-radius: 12rpx;
  background: #eff6ff;
  color: #2563eb;
  font-size: 24rpx;
  font-weight: 800;
  line-height: 52rpx;
  text-align: center;
  margin-right: 16rpx;
}

.task-body {
  flex: 1;
  min-width: 0;
}

.customer,
.address,
.distance,
.record-foot {
  display: block;
}

.customer {
  font-size: 28rpx;
  font-weight: 800;
  color: #111827;
}

.address {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.distance,
.record-foot {
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #94a3b8;
}

.check-btn {
  width: 108rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 14rpx;
  background: #f59e0b;
  color: #ffffff;
  font-size: 24rpx;
  font-weight: 800;
  margin-left: 14rpx;
}

.check-btn.done {
  background: #d1fae5;
  color: #047857;
}

.check-btn.loading {
  background: #cbd5e1;
  color: #475569;
}

.valid {
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  background: #d1fae5;
  color: #047857;
  font-size: 22rpx;
}

.valid.invalid {
  background: #fee2e2;
  color: #dc2626;
}
</style>
