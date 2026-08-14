<template>
  <view class="stat-card" @click="$emit('click')">
    <view class="stat-head">
      <text class="stat-icon">{{ icon }}</text>
      <text v-if="trend" class="trend">{{ trend }}</text>
    </view>
    <text class="stat-value">{{ value }}</text>
    <text class="stat-label">{{ label }}</text>
  </view>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], default: 0 },
  icon: { type: String, default: '·' },
  trend: { type: String, default: '' }
})

defineEmits(['click'])
</script>

<style scoped>
.stat-card {
  min-height: 164rpx;
  background: #ffffff;
  border: 1rpx solid #e8edf5;
  border-radius: 16rpx;
  padding: 22rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.stat-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-icon {
  width: 44rpx;
  height: 44rpx;
  border-radius: 12rpx;
  background: #eff6ff;
  color: #2563eb;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 44rpx;
  text-align: center;
}

.trend {
  font-size: 22rpx;
  color: #059669;
}

.stat-value {
  margin-top: 12rpx;
  font-size: 40rpx;
  font-weight: 800;
  color: #111827;
  line-height: 1.15;
}

.stat-label {
  margin-top: 6rpx;
  font-size: 24rpx;
  color: #64748b;
}
</style>
