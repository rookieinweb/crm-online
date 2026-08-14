<template>
  <view class="empty-state">
    <text class="mark">空</text>
    <text class="text">{{ text }}</text>
  </view>
</template>

<script setup>
defineProps({
  text: { type: String, default: '暂无数据' }
})
</script>

<style scoped>
.empty-state {
  padding: 56rpx 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
}

.mark {
  width: 72rpx;
  height: 72rpx;
  border-radius: 16rpx;
  background: #eef2f7;
  color: #64748b;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 72rpx;
  text-align: center;
  margin-bottom: 16rpx;
}

.text {
  font-size: 26rpx;
}
</style>
