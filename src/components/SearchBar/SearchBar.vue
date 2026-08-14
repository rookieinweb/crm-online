<template>
  <view class="search-bar">
    <text class="search-icon">搜</text>
    <input
      class="search-input"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      placeholder-class="placeholder"
      confirm-type="search"
      @input="onInput"
      @confirm="$emit('search', modelValue)"
    />
    <text v-if="modelValue" class="clear" @click="clear">×</text>
  </view>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '搜索' }
})

const emit = defineEmits(['update:modelValue', 'search'])

function onInput(e) {
  emit('update:modelValue', e.detail.value)
}

function clear() {
  emit('update:modelValue', '')
  emit('search', '')
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  height: 76rpx;
  padding: 0 22rpx;
  background: #ffffff;
  border: 1rpx solid #e2e8f0;
  border-radius: 16rpx;
}

.search-icon {
  width: 42rpx;
  height: 42rpx;
  border-radius: 10rpx;
  background: #f1f5f9;
  color: #475569;
  font-size: 20rpx;
  font-weight: 700;
  line-height: 42rpx;
  text-align: center;
  margin-right: 14rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #111827;
}

.placeholder {
  color: #94a3b8;
}

.clear {
  width: 42rpx;
  height: 42rpx;
  line-height: 40rpx;
  text-align: center;
  font-size: 36rpx;
  color: #94a3b8;
}
</style>
