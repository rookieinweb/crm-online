<template>
  <view class="follow-page">
    <view class="composer panel">
      <view class="composer-head">
        <text class="section-title">新增跟进</text>
        <text class="hint">记录沟通内容和下次动作</text>
      </view>
      <textarea v-model="draft" class="textarea" placeholder="例如：已沟通报价，客户希望周五前收到方案。" />
      <view class="composer-actions">
        <view
          v-for="item in typeOptions"
          :key="item.value"
          class="type-chip"
          :class="{ active: type === item.value }"
          @click="type = item.value"
        >
          {{ item.label }}
        </view>
        <button class="save-btn" @click="saveDraft">保存</button>
      </view>
    </view>

    <view class="panel">
      <view class="section-header">
        <text class="section-title">跟进记录</text>
        <text class="count">{{ records.length }} 条</text>
      </view>
      <view v-for="item in records" :key="item.id" class="record">
        <view class="record-head">
          <text class="customer">{{ item.customerName }}</text>
          <text class="type">{{ FOLLOW_TYPES[item.type] }}</text>
        </view>
        <text class="content">{{ item.content }}</text>
        <view class="record-foot">
          <text>{{ item.creatorName }} · {{ formatDate(item.createdAt, 'MM月DD日 HH:mm') }}</text>
          <text>下次：{{ formatPlanTime(item.nextFollowAt) }}</text>
        </view>
      </view>
      <EmptyState v-if="!records.length" text="暂无跟进记录" />
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTabBar } from '@/composables/useTabBar'
import { FOLLOW_TYPES } from '@/constants/status'
import { formatDate, formatPlanTime } from '@/utils/format'
import { mockGetFollowRecords } from '@/api/mock/data'
import EmptyState from '@/components/EmptyState/EmptyState.vue'

useTabBar(2)

const records = ref([])
const draft = ref('')
const type = ref('phone')
const typeOptions = Object.keys(FOLLOW_TYPES).map((value) => ({ value, label: FOLLOW_TYPES[value] }))

async function loadData() {
  records.value = await mockGetFollowRecords()
}

function saveDraft() {
  if (!draft.value.trim()) {
    uni.showToast({ title: '请输入跟进内容', icon: 'none' })
    return
  }
  uni.showToast({ title: '已保存为前端原型记录', icon: 'none' })
  draft.value = ''
}

onMounted(loadData)
</script>

<style scoped>
.follow-page {
  min-height: 100vh;
  padding: 24rpx 24rpx 148rpx;
  background: #f4f6fa;
}

.panel {
  background: #ffffff;
  border: 1rpx solid #e8edf5;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 18rpx;
}

.composer-head,
.section-header,
.record-head,
.record-foot,
.composer-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  font-size: 30rpx;
  font-weight: 800;
  color: #111827;
}

.hint,
.count {
  font-size: 22rpx;
  color: #64748b;
}

.textarea {
  width: 100%;
  height: 168rpx;
  margin-top: 18rpx;
  padding: 18rpx;
  box-sizing: border-box;
  border-radius: 14rpx;
  background: #f8fafc;
  font-size: 28rpx;
  color: #111827;
}

.composer-actions {
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 16rpx;
  justify-content: flex-start;
}

.type-chip {
  padding: 10rpx 18rpx;
  border-radius: 12rpx;
  background: #f1f5f9;
  color: #475569;
  font-size: 24rpx;
}

.type-chip.active {
  background: #dbeafe;
  color: #2563eb;
  font-weight: 700;
}

.save-btn {
  margin-left: auto;
  width: 132rpx;
  height: 62rpx;
  line-height: 62rpx;
  border-radius: 14rpx;
  background: #2563eb;
  color: #ffffff;
  font-size: 26rpx;
  font-weight: 800;
}

.record {
  padding: 22rpx 0;
  border-bottom: 1rpx solid #eef2f7;
}

.record:last-child {
  border-bottom: none;
}

.customer {
  flex: 1;
  min-width: 0;
  font-size: 28rpx;
  font-weight: 800;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.type {
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  background: #e0f2fe;
  color: #0369a1;
  font-size: 22rpx;
  margin-left: 12rpx;
}

.content {
  display: block;
  margin-top: 12rpx;
  font-size: 26rpx;
  color: #334155;
  line-height: 1.55;
}

.record-foot {
  margin-top: 12rpx;
  font-size: 22rpx;
  color: #64748b;
}
</style>
