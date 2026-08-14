<template>
  <view class="form-page">
    <view class="panel">
      <view class="field">
        <text class="label">客户名称</text>
        <input v-model="form.name" class="input" placeholder="请输入公司名称" />
      </view>
      <view class="field">
        <text class="label">联系人</text>
        <input v-model="form.contactName" class="input" placeholder="请输入联系人" />
      </view>
      <view class="field">
        <text class="label">联系电话</text>
        <input v-model="form.contactPhone" class="input" type="number" placeholder="请输入手机号" />
      </view>
      <view class="field">
        <text class="label">所属行业</text>
        <input v-model="form.industry" class="input" placeholder="例如：制造业、贸易、软件" />
      </view>
      <view class="field">
        <text class="label">公司地址</text>
        <input v-model="form.address" class="input" placeholder="请输入客户公司地址" />
      </view>
      <picker :range="levels" @change="onLevelChange">
        <view class="field picker-field">
          <text class="label">客户等级</text>
          <text class="picker-value">{{ form.level }}级</text>
        </view>
      </picker>
      <picker :range="statusLabels" @change="onStatusChange">
        <view class="field picker-field">
          <text class="label">客户阶段</text>
          <text class="picker-value">{{ statusLabels[statusIndex] }}</text>
        </view>
      </picker>
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

const levels = CUSTOMER_LEVELS
const statusOptions = Object.keys(CUSTOMER_STATUS)
const statusLabels = statusOptions.map((key) => CUSTOMER_STATUS[key].label)
const statusIndex = ref(0)
const saving = ref(false)

const form = reactive({
  name: '',
  contactName: '',
  contactPhone: '',
  industry: '',
  address: '',
  level: 'B',
  status: 'potential',
  remark: ''
})

function onLevelChange(e) {
  form.level = levels[e.detail.value]
}

function onStatusChange(e) {
  statusIndex.value = Number(e.detail.value)
  form.status = statusOptions[statusIndex.value]
}

async function submit() {
  if (!form.name || !form.contactName || !form.contactPhone) {
    uni.showToast({ title: '请填写客户名称、联系人和电话', icon: 'none' })
    return
  }
  saving.value = true
  try {
    const customer = await createCustomer({ ...form })
    uni.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => {
      uni.redirectTo({ url: `/pages/customer/detail?id=${customer.id}` })
    }, 250)
  } catch (e) {
    uni.showToast({ title: e.message || '保存失败', icon: 'none' })
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.form-page {
  min-height: 100vh;
  padding: 24rpx 24rpx 48rpx;
  background: #f4f6fa;
}

.panel {
  background: #ffffff;
  border: 1rpx solid #e8edf5;
  border-radius: 16rpx;
  padding: 0 24rpx;
}

.field {
  min-height: 96rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #eef2f7;
}

.field:last-child {
  border-bottom: none;
}

.label {
  width: 160rpx;
  font-size: 26rpx;
  color: #475569;
  flex-shrink: 0;
}

.input,
.picker-value {
  flex: 1;
  min-width: 0;
  font-size: 28rpx;
  color: #111827;
}

.picker-field {
  justify-content: space-between;
}

.picker-value {
  text-align: right;
}

.textarea-field {
  align-items: flex-start;
  padding: 26rpx 0;
}

.textarea {
  flex: 1;
  height: 160rpx;
  font-size: 28rpx;
  color: #111827;
}

.submit {
  margin-top: 28rpx;
  height: 88rpx;
  border-radius: 16rpx;
  background: #2563eb;
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 800;
  line-height: 88rpx;
}
</style>
