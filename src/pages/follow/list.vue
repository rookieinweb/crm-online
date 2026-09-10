<template>
  <view class="follow-page">
    <view class="composer panel">
      <view class="composer-head">
        <text class="section-title">新增跟进</text>
        <text class="hint">选择客户并保存到后端</text>
      </view>

      <picker :range="customerPickerLabels" @change="onCustomerChange">
        <view class="customer-picker">
          <text>{{ selectedCustomerName || '请选择客户' }}</text>
          <text class="picker-arrow">›</text>
        </view>
      </picker>

      <textarea v-model="draft" class="textarea" placeholder="例如：已沟通报价，客户希望周五前收到方案。" />
      <view class="composer-actions">
        <view v-for="item in typeOptions" :key="item.value" class="type-chip" :class="{ active: type === item.value }" @click="type = item.value">
          {{ item.label }}
        </view>
        <button class="save-btn" :loading="saving" @click="saveDraft">保存</button>
      </view>
    </view>

    <view class="panel">
      <view class="section-header">
        <text class="section-title">跟进记录</text>
        <text class="count">{{ records.length }} 条</text>
      </view>
      <view v-for="item in records" :key="item.id" class="record">
        <view class="record-head">
          <text class="customer">{{ item.customerName || selectedCustomerName }}</text>
          <text class="type">{{ item.typeLabel || FOLLOW_TYPES[item.type] || item.type }}</text>
        </view>
        <text class="content">{{ item.content || '暂无内容' }}</text>
        <view class="record-foot">
          <text>{{ item.creatorName || '-' }} · {{ formatDate(item.createdAt, 'MM月DD日 HH:mm') }}</text>
          <text>下次：{{ formatPlanTime(item.nextFollowAt) }}</text>
        </view>
      </view>
      <EmptyState v-if="!records.length" text="暂无跟进记录" />
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { createFollow, fetchCustomer, fetchCustomers } from '@/api/customer'
import { FOLLOW_TYPES } from '@/constants/status'
import { formatDate, formatPlanTime } from '@/utils/format'
import { useTabBar } from '@/composables/useTabBar'
import EmptyState from '@/components/EmptyState/EmptyState.vue'

useTabBar(2)

const customers = ref([])
const selectedCustomerId = ref('')
const selectedCustomerName = ref('')
const records = ref([])
const draft = ref('')
const type = ref('电话')
const saving = ref(false)
const typeOptions = ['电话', '微信', '拜访'].map((value) => ({ value, label: value }))
const customerPickerLabels = computed(() => customers.value.map((item) => item.product_name || item.name || item.customer_name || `客户${item.id}`))

async function loadCustomers() {
  const res = await fetchCustomers({ page: 1, size: 50, status: 'all' })
  customers.value = res.list || []

  const cachedId = uni.getStorageSync('zhike_follow_customer_id')
  if (cachedId && customers.value.some((item) => String(item.id) === String(cachedId))) {
    selectCustomer(cachedId)
    uni.removeStorageSync('zhike_follow_customer_id')
  } else if (!selectedCustomerId.value && customers.value.length) {
    selectCustomer(customers.value[0].id)
  } else if (selectedCustomerId.value) {
    selectCustomer(selectedCustomerId.value)
  }
}

async function selectCustomer(id) {
  selectedCustomerId.value = id
  const customer = customers.value.find((item) => String(item.id) === String(id))
  selectedCustomerName.value = customer?.product_name || customer?.name || customer?.customer_name || ''
  await loadRecords(id)
}

async function loadRecords(id) {
  if (!id) {
    records.value = []
    return
  }
  try {
    const detail = await fetchCustomer(id)
    selectedCustomerName.value = detail.product_name || detail.name || detail.customer_name || selectedCustomerName.value
    records.value = detail.follows || []
  } catch (e) {
    uni.showToast({ title: e.message || '跟进记录加载失败', icon: 'none' })
  }
}

function onCustomerChange(e) {
  const customer = customers.value[Number(e.detail.value)]
  if (customer?.id) selectCustomer(customer.id)
}

async function saveDraft() {
  if (!selectedCustomerId.value) {
    uni.showToast({ title: '请选择客户', icon: 'none' })
    return
  }
  if (!draft.value.trim()) {
    uni.showToast({ title: '请输入跟进内容', icon: 'none' })
    return
  }

  saving.value = true
  try {
    await createFollow({
      customerId: selectedCustomerId.value,
      type: type.value,
      title: type.value,
      content: draft.value.trim(),
      result: '',
      nextFollowAt: ''
    })
    uni.showToast({ title: '跟进记录已保存', icon: 'success' })
    draft.value = ''
    await loadRecords(selectedCustomerId.value)
  } catch (e) {
    uni.showToast({ title: e.message || '保存失败', icon: 'none' })
  } finally {
    saving.value = false
  }
}

onShow(loadCustomers)
</script>

<style scoped>
.follow-page { min-height: 100vh; padding: 24rpx 24rpx 148rpx; background: #f4f6fa; }
.panel { background: #ffffff; border: 1rpx solid #e8edf5; border-radius: 16rpx; padding: 24rpx; margin-bottom: 18rpx; }
.composer-head, .section-header, .record-head, .record-foot, .composer-actions, .customer-picker { display: flex; align-items: center; justify-content: space-between; }
.section-title { font-size: 30rpx; font-weight: 800; color: #111827; }
.hint, .count { font-size: 22rpx; color: #64748b; }
.customer-picker { height: 76rpx; padding: 0 18rpx; margin-top: 18rpx; border-radius: 14rpx; background: #f8fafc; color: #111827; font-size: 26rpx; }
.picker-arrow { color: #94a3b8; font-size: 42rpx; }
.textarea { width: 100%; height: 168rpx; margin-top: 18rpx; padding: 18rpx; box-sizing: border-box; border-radius: 14rpx; background: #f8fafc; font-size: 28rpx; color: #111827; }
.composer-actions { flex-wrap: wrap; gap: 12rpx; margin-top: 16rpx; justify-content: flex-start; }
.type-chip { padding: 10rpx 18rpx; border-radius: 12rpx; background: #f1f5f9; color: #475569; font-size: 24rpx; }
.type-chip.active { background: #dbeafe; color: #2563eb; font-weight: 700; }
.save-btn { margin-left: auto; width: 132rpx; height: 62rpx; line-height: 62rpx; border-radius: 14rpx; background: #2563eb; color: #ffffff; font-size: 26rpx; font-weight: 800; }
.record { padding: 22rpx 0; border-bottom: 1rpx solid #eef2f7; }
.record:last-child { border-bottom: none; }
.customer { flex: 1; min-width: 0; font-size: 28rpx; font-weight: 800; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.type { padding: 6rpx 12rpx; border-radius: 8rpx; background: #e0f2fe; color: #0369a1; font-size: 22rpx; margin-left: 12rpx; }
.content { display: block; margin-top: 12rpx; font-size: 26rpx; color: #334155; line-height: 1.55; }
.record-foot { margin-top: 12rpx; font-size: 22rpx; color: #64748b; }
</style>
