<template>
  <view class="quick-actions">
    <view class="action-item" @click="go('/pages/customer/form')">
      <view class="icon add">+</view>
      <text>新增客户</text>
    </view>
    <view class="action-item" @click="go('/pages/follow/list')">
      <view class="icon follow">记</view>
      <text>写跟进</text>
    </view>
    <view class="action-item" @click="go('/pages/visit/today')">
      <view class="icon visit">签</view>
      <text>去打卡</text>
    </view>
  </view>
</template>

<script setup>
function go(url) {
  if (url.includes('/pages/customer/form')) {
    uni.navigateTo({ url })
    return
  }
  uni.switchTab({ url })
}
</script>

<style scoped>
.quick-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.action-item {
  height: 148rpx;
  background: #ffffff;
  border: 1rpx solid #e8edf5;
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #334155;
}

.icon {
  width: 54rpx;
  height: 54rpx;
  border-radius: 14rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  font-weight: 800;
  margin-bottom: 12rpx;
}

.add {
  background: #dbeafe;
  color: #2563eb;
}

.follow {
  background: #d1fae5;
  color: #059669;
}

.visit {
  background: #fef3c7;
  color: #b45309;
}
</style>
