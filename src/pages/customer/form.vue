<template>
  <view class="form-page">
    <view class="panel">
      <view class="field">
        <text class="label">客户姓名</text>
        <input v-model="form.customer_name" class="input" placeholder="请输入客户姓名" />
      </view>
      <view class="field">
        <text class="label">手机号</text>
        <input v-model="form.phone" class="input" type="number" placeholder="请输入手机号" />
      </view>
      <view class="field">
        <text class="label">产品名称</text>
        <input v-model="form.product_name" class="input" placeholder="请输入产品名称" />
      </view>
      <picker :range="sourceOptions" @change="onSourceChange">
        <view class="field picker-field">
          <text class="label">客户来源</text>
          <text class="picker-value">{{ form.customer_source }}</text>
        </view>
      </picker>
      <picker :range="levels" @change="onLevelChange">
        <view class="field picker-field">
          <text class="label">客户级别</text>
          <text class="picker-value">{{ form.customer_level || '未选择' }}</text>
        </view>
      </picker>
      <picker :range="statusLabels" @change="onStatusChange">
        <view class="field picker-field">
          <text class="label">客户状态</text>
          <text class="picker-value">{{ statusLabels[statusIndex] }}</text>
        </view>
      </picker>
      <view class="field">
        <text class="label">省份</text>
        <input v-model="form.province" class="input" placeholder="请输入省份" />
      </view>
      <view class="field">
        <text class="label">城市</text>
        <input v-model="form.city" class="input" placeholder="请输入城市" />
      </view>
      <view class="field">
        <text class="label">详细地址</text>
        <input v-model="form.address" class="input" placeholder="请输入详细地址" />
      </view>
      <view v-if="form.customer_status === 'deal'" class="field">
        <text class="label">成交金额</text>
        <input v-model="form.deal_amount" class="input" type="digit" placeholder="请输入成交金额" />
      </view>
      <view class="field textarea-field">
        <text class="label">备注</text>
        <textarea v-model="form.remark" class="textarea" placeholder="记录客户背景、需求或交接信息" />
      </view>
    </view>

    <button class="submit" :loading="saving" @click="submit">保存客户</button>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { createCustomer } from '@/api/customer'
import { CUSTOMER_LEVELS, CUSTOMER_STATUS } from '@/constants/status'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const levels = CUSTOMER_LEVELS
const sourceOptions = ['微信', '官网', '抖音', '线下']
const statusOptions = ['potential', 'contacted', 'intention', 'negotiating', 'deal', 'lost']
const statusLabels = statusOptions.map((key) => CUSTOMER_STATUS[key].label)
const statusIndex = ref(0)
const saving = ref(false)

const form = reactive({
  customer_name: '',
  phone: '',
  customer_source: '微信',
  customer_status: 'potential',
  customer_level: 'B',
  product_name: '',
  province: '',
  city: '',
  address: '',
  owner_id: userStore.profile?.id || '',
  remark: '',
  deal_amount: 0
})

function onSourceChange(e) {
  form.customer_source = sourceOptions[e.detail.value]
}

function onLevelChange(e) {
  form.customer_level = levels[e.detail.value]
}

function onStatusChange(e) {
  statusIndex.value = Number(e.detail.value)
  form.customer_status = statusOptions[statusIndex.value]
}

async function submit() {
  if (!form.customer_name || !form.phone) {
    uni.showToast({ title: '请填写客户姓名和手机号', icon: 'none' })
    return
  }
  saving.value = true
  try {
    const customer = await createCustomer({ ...form })
    uni.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => {
      if (customer?.id) {
        uni.redirectTo({ url: `/pages/customer/detail?id=${customer.id}` })
      } else {
        uni.switchTab({ url: '/pages/customer/list' })
      }
    }, 250)
  } catch (e) {
    uni.showToast({ title: e.message || '保存失败', icon: 'none' })
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.form-page { min-height: 100vh; padding: 24rpx 24rpx 48rpx; background: #f4f6fa; }
.panel { background: #ffffff; border: 1rpx solid #e8edf5; border-radius: 16rpx; padding: 0 24rpx; }
.field { min-height: 96rpx; display: flex; align-items: center; border-bottom: 1rpx solid #eef2f7; }
.field:last-child { border-bottom: none; }
.label { width: 160rpx; font-size: 26rpx; color: #475569; flex-shrink: 0; }
.input, .picker-value { flex: 1; min-width: 0; font-size: 28rpx; color: #111827; }
.picker-field { justify-content: space-between; }
.picker-value { text-align: right; }
.textarea-field { align-items: flex-start; padding: 26rpx 0; }
.textarea { flex: 1; height: 160rpx; font-size: 28rpx; color: #111827; }
.submit { margin-top: 28rpx; height: 88rpx; border-radius: 16rpx; background: #2563eb; color: #ffffff; font-size: 30rpx; font-weight: 800; line-height: 88rpx; }
</style>
