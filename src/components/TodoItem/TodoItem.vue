<template>
  <view class="todo-item" @click="$emit('click', item)">
    <view class="priority" :class="item.priority" />
    <view class="content">
      <view class="row">
        <text class="name">{{ item.customerName }}</text>
        <text class="tag">{{ item.priority === 'high' ? '今天' : '计划' }}</text>
      </view>
      <text v-if="item.lastContactAt" class="sub">上次联系：{{ formatDate(item.lastContactAt) }}</text>
      <text v-if="item.planTime" class="sub plan">计划跟进：{{ formatPlanTime(item.planTime) }}</text>
    </view>
    <text class="arrow">›</text>
  </view>
</template>

<script setup>
import { formatDate, formatPlanTime } from '@/utils/format'

defineProps({
  item: { type: Object, required: true }
})

defineEmits(['click'])
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: flex-start;
  padding: 22rpx 0;
  border-bottom: 1rpx solid #eef2f7;
}

.todo-item:last-child {
  border-bottom: none;
}

.priority {
  width: 10rpx;
  height: 72rpx;
  border-radius: 999rpx;
  margin-top: 4rpx;
  margin-right: 18rpx;
  background: #2563eb;
  flex-shrink: 0;
}

.priority.high {
  background: #f59e0b;
}

.content {
  flex: 1;
  min-width: 0;
}

.row {
  display: flex;
  align-items: center;
}

.name {
  flex: 1;
  min-width: 0;
  font-size: 28rpx;
  font-weight: 700;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag {
  margin-left: 12rpx;
  padding: 4rpx 10rpx;
  border-radius: 8rpx;
  background: #fff7ed;
  color: #c2410c;
  font-size: 20rpx;
}

.sub {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #64748b;
}

.plan {
  color: #2563eb;
}

.arrow {
  color: #94a3b8;
  font-size: 42rpx;
  line-height: 1;
  margin-left: 10rpx;
}
</style>
