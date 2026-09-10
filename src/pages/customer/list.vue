<template>
  <view class="customer-page">
    <view class="toolbar">
      <SearchBar v-model="keyword" placeholder="搜索客户名称、联系人、电话" @search="handleSearch" />
      <scroll-view scroll-x class="filter-tabs" :show-scrollbar="false">
        <view v-for="tab in tabs" :key="tab.value" class="filter-tab" :class="{ active: status === tab.value }" @click="changeStatus(tab.value)">
          {{ tab.label }}
        </view>
      </scroll-view>
    </view>

    <view class="summary">
      <text>当前 {{ total }} 个客户</text>
      <text>第 {{ page }} 页</text>
    </view>

    <view class="list-wrap">
      <CustomerItem v-for="item in list" :key="item.id" :item="item" @click="goDetail" />
      <EmptyState v-if="!loading && !list.length" text="暂无客户，点击右下角新增" />
    </view>

    <view v-if="list.length < total" class="load-more" @click="loadMore">加载更多</view>
    <view class="fab" @click="goCreate">+</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
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
const total = ref(0)
const page = ref(1)
const size = 10
const loading = ref(false)

const tabs = [
  { label: '全部', value: 'all' },
  { label: '潜在', value: 'potential' },
  { label: '已联系', value: 'contacted' },
  { label: '意向', value: 'intention' },
  { label: '商谈中', value: 'negotiating' },
  { label: '已成交', value: 'deal' },
  { label: '已流失', value: 'lost' }
]

async function loadList(reset = true) {
  if (loading.value) return
  loading.value = true
  try {
    const nextPage = reset ? 1 : page.value + 1
    const res = await fetchCustomers({
      page: nextPage,
      size,
      keyword: keyword.value,
      status: status.value
    })
    list.value = reset ? res.list : list.value.concat(res.list)
    total.value = res.total
    page.value = nextPage
  } catch (e) {
    uni.showToast({ title: e.message || '加载失败', icon: 'none' })
  } finally {
    loading.value = false
    uni.stopPullDownRefresh()
  }
}

function handleSearch() {
  loadList(true)
}

function loadMore() {
  loadList(false)
}

function changeStatus(val) {
  status.value = val
  loadList(true)
}

function goDetail(item) {
  uni.navigateTo({ url: `/pages/customer/detail?id=${item.id}` })
}

function goCreate() {
  uni.navigateTo({ url: '/pages/customer/form' })
}

onShow(() => loadList(true))
onPullDownRefresh(() => loadList(true))
</script>

<style scoped>
.customer-page { min-height: 100vh; padding: 24rpx 24rpx 148rpx; background: #f4f6fa; }
.toolbar { margin-bottom: 18rpx; }
.filter-tabs { white-space: nowrap; margin-top: 18rpx; }
.filter-tab { display: inline-block; padding: 12rpx 24rpx; margin-right: 12rpx; background: #ffffff; border: 1rpx solid #e2e8f0; border-radius: 14rpx; font-size: 24rpx; color: #64748b; }
.filter-tab.active { background: #2563eb; border-color: #2563eb; color: #ffffff; font-weight: 700; }
.summary { display: flex; justify-content: space-between; margin-bottom: 16rpx; font-size: 22rpx; color: #64748b; }
.list-wrap { min-height: 420rpx; }
.load-more { height: 72rpx; line-height: 72rpx; text-align: center; color: #2563eb; font-size: 26rpx; }
.fab { position: fixed; right: 36rpx; bottom: 168rpx; width: 96rpx; height: 96rpx; border-radius: 28rpx; background: #2563eb; color: #ffffff; font-size: 54rpx; line-height: 90rpx; text-align: center; box-shadow: 0 14rpx 28rpx rgba(37, 99, 235, 0.28); z-index: 100; }
</style>
