<template>
  <view class="customer-item" @click="$emit('click', item)">
    <view class="top">
      <text class="name">{{ item.name }}</text>
      <text class="level" :class="'level-' + item.level">{{ item.level }}</text>
    </view>
    <view class="meta">
      <text class="contact">{{ item.contactName }} · {{ item.contactPhone }}</text>
      <text class="status" :style="{ color: statusInfo.color, backgroundColor: statusInfo.bg }">
        {{ statusInfo.label }}
      </text>
    </view>
    <view class="footer">
      <text>{{ item.industry }}</text>
      <text v-if="item.lastFollowAt">上次跟进：{{ formatDate(item.lastFollowAt) }}</text>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { CUSTOMER_STATUS } from '@/constants/status'
import { formatDate } from '@/utils/format'

const props = defineProps({
  item: { type: Object, required: true }
})

defineEmits(['click'])

const statusInfo = computed(() => CUSTOMER_STATUS[props.item.status] || CUSTOMER_STATUS.potential)
</script>

<style scoped>
.customer-item {
  background: #ffffff;
  border: 1rpx solid #e8edf5;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
}

.top,
.meta,
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.name {
  flex: 1;
  min-width: 0;
  font-size: 30rpx;
  font-weight: 700;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 16rpx;
}

.level {
  width: 44rpx;
  height: 44rpx;
  border-radius: 10rpx;
  font-size: 22rpx;
  font-weight: 800;
  line-height: 44rpx;
  text-align: center;
  flex-shrink: 0;
}

.level-A {
  background: #fef3c7;
  color: #b45309;
}

.level-B {
  background: #dbeafe;
  color: #2563eb;
}

.level-C {
  background: #eef2f7;
  color: #64748b;
}

.meta {
  margin-top: 14rpx;
}

.contact {
  flex: 1;
  min-width: 0;
  font-size: 24rpx;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 12rpx;
}

.status {
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  font-size: 22rpx;
  flex-shrink: 0;
}

.footer {
  margin-top: 16rpx;
  font-size: 22rpx;
  color: #94a3b8;
}
</style>
