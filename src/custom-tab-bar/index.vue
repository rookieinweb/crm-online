<template>
  <view class="tab-bar">
    <view
      v-for="(item, index) in list"
      :key="item.pagePath"
      class="tab-item"
      @click="switchTab(index, item.pagePath)"
    >
      <text class="tab-icon" :class="{ active: selected === index }">{{ item.icon }}</text>
      <text class="tab-text" :class="{ active: selected === index }">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(0)

const list = [
  { pagePath: '/pages/index/index', text: '首页', icon: '首' },
  { pagePath: '/pages/customer/list', text: '客户', icon: '客' },
  { pagePath: '/pages/follow/list', text: '跟进', icon: '记' },
  { pagePath: '/pages/visit/today', text: '拜访', icon: '签' },
  { pagePath: '/pages/mine/index', text: '我的', icon: '我' }
]

function switchTab(index, path) {
  if (selected.value === index) return
  selected.value = index
  uni.switchTab({ url: path })
}

function setSelected(index) {
  selected.value = index
}

defineExpose({ setSelected })
</script>

<style scoped>
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 108rpx;
  padding-bottom: env(safe-area-inset-bottom);
  background: #ffffff;
  border-top: 1rpx solid #e5e7eb;
  z-index: 999;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-icon {
  width: 42rpx;
  height: 42rpx;
  line-height: 42rpx;
  text-align: center;
  font-size: 20rpx;
  font-weight: 800;
  color: #64748b;
  border-radius: 12rpx;
}

.tab-icon.active {
  background: #dbeafe;
  color: #2563eb;
}

.tab-text {
  margin-top: 6rpx;
  font-size: 20rpx;
  color: #64748b;
}

.tab-text.active {
  color: #2563eb;
  font-weight: 700;
}
</style>
