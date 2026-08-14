<template>
  <view class="customer-page">
    <view class="toolbar">
      <SearchBar
        v-model="keyword"
        placeholder="搜索客户名称、联系人、电话"
        @search="loadList"
      />
      <scroll-view scroll-x class="filter-tabs" :show-scrollbar="false">
        <view
          v-for="tab in tabs"
          :key="tab.value"
          class="filter-tab"
          :class="{ active: status === tab.value }"
          @click="changeStatus(tab.value)"
        >
          {{ tab.label }}
        </view>
      </scroll-view>
    </view>

    <view class="summary">
      <text>当前 {{ list.length }} 个客户</text>
      <text>按最近跟进排序</text>
    </view>

    <view class="list-wrap">
      <CustomerItem
        v-for="item in list"
        :key="item.id"
        :item="item"
        @click="goDetail"
      />
      <EmptyState v-if="!loading && !list.length" text="暂无客户，点击右下角新增" />
    </view>

    <view class="fab" @click="goCreate">+</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { fetchCustomers } from '@/api/customer'
import { useTabBar } from '@/composables/useTabBar'
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import CustomerItem from '@/components/CustomerItem/CustomerItem.vue'
import EmptyState from '@/components/EmptyState/EmptyState.vue'

useTabBar(1)

const keyword = ref('')
const status = ref('all')
const list = ref([])
const loading = ref(false)

const tabs = [
  { label: '全部', value: 'all' },
  { label: '潜在', value: 'potential' },
  { label: '跟进中', value: 'following' },
  { label: '已成交', value: 'deal' },
  { label: '已流失', value: 'lost' }
]

async function loadList() {
  loading.value = true
  try {
    const res = await fetchCustomers({ keyword: keyword.value, status: status.value })
    list.value = res.list
  } catch (e) {
    uni.showToast({ title: e.message || '加载失败', icon: 'none' })
  } finally {
    loading.value = false
    uni.stopPullDownRefresh()
  }
}

function changeStatus(val) {
  status.value = val
  loadList()
}

function goDetail(item) {
  uni.navigateTo({ url: `/pages/customer/detail?id=${item.id}` })
}

function goCreate() {
  uni.navigateTo({ url: '/pages/customer/form' })
}

onMounted(loadList)
onShow(loadList)
onPullDownRefresh(loadList)
</script>

<style scoped>
.customer-page {
  min-height: 100vh;
  padding: 24rpx 24rpx 148rpx;
  background: #f4f6fa;
}

.toolbar {
  margin-bottom: 18rpx;
}

.filter-tabs {
  white-space: nowrap;
  margin-top: 18rpx;
}

.filter-tab {
  display: inline-block;
  padding: 12rpx 24rpx;
  margin-right: 12rpx;
  background: #ffffff;
  border: 1rpx solid #e2e8f0;
  border-radius: 14rpx;
  font-size: 24rpx;
  color: #64748b;
}

.filter-tab.active {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
  font-weight: 700;
}

.summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
  font-size: 22rpx;
  color: #64748b;
}

.list-wrap {
  min-height: 420rpx;
}

.fab {
  position: fixed;
  right: 36rpx;
  bottom: 168rpx;
  width: 96rpx;
  height: 96rpx;
  border-radius: 28rpx;
  background: #2563eb;
  color: #ffffff;
  font-size: 54rpx;
  line-height: 90rpx;
  text-align: center;
  box-shadow: 0 14rpx 28rpx rgba(37, 99, 235, 0.28);
  z-index: 100;
}
</style>
