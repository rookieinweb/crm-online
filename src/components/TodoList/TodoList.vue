<template>
  <view class="todo-list">
    <TodoItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      @click="$emit('item-click', item)"
    />
    <EmptyState v-if="!items.length" text="暂无待办，继续保持" />
  </view>
</template>

<script setup>
import TodoItem from '@/components/TodoItem/TodoItem.vue'
import EmptyState from '@/components/EmptyState/EmptyState.vue'

defineProps({
  items: { type: Array, default: () => [] }
})

defineEmits(['item-click'])
</script>

<style scoped>
.todo-list {
  min-height: 120rpx;
}
</style>
