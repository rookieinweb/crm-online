<template>
  <view class="card-page">
    <view class="card-wrap">
      <view class="badge">个人名片</view>
      <view class="avatar">A</view>
      <view class="name">张三</view>
      <view class="job">前端工程师 · 设计师</view>

      <view class="info-list">
        <view class="info-item">
          <text class="label">手机</text>
          <text class="value">138 0000 0000</text>
        </view>
        <view class="info-item">
          <text class="label">邮箱</text>
          <text class="value">zhangsan@example.com</text>
        </view>
        <view class="info-item">
          <text class="label">公司</text>
          <text class="value">某某科技有限公司</text>
        </view>
        <view class="info-item">
          <text class="label">地址</text>
          <text class="value">北京市朝阳区</text>
        </view>
      </view>

      <view class="action-bar">
        <button class="btn primary" open-type="share">分享名片</button>
        <button class="btn" @click="callPhone">拨打电话</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    callPhone() {
      uni.makePhoneCall({
        phoneNumber: '13800000000'
      })
    }
  }
}
</script>

<style scoped>
.card-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24rpx;
  background: linear-gradient(180deg, #eef4ff 0%, #f6f7fb 100%);
}

.card-wrap {
  width: 100%;
  max-width: 680rpx;
  background: #ffffff;
  border-radius: 28rpx;
  box-shadow: 0 10rpx 40r rgba(32, 60, 120, 0.12);
  padding: 36rpx;
}

.badge {
  display: inline-block;
  padding: 6rpx 16rpx;
  background: #e8f0ff;
  color: #3a6ff7;
  border-radius: 999rpx;
  font-size: 24rpx;
  margin-bottom: 24rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #5b8cff, #7f5bff);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 46rpx;
  font-weight: 700;
  margin-bottom: 20rpx;
}

.name {
  font-size: 44rpx;
  font-weight: 700;
  color: #1f2937;
}

.job {
  margin-top: 10rpx;
  font-size: 28rpx;
  color: #6b7280;
}

.info-list {
  margin-top: 32rpx;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18rpx 0;
  border-bottom: 1rpx solid #e5e7eb;
}

.label {
  color: #6b7280;
  font-size: 28rpx;
}

.value {
  color: #111827;
  font-size: 28rpx;
  font-weight: 500;
}

.action-bar {
  display: flex;
  gap: 20rpx;
  margin-top: 32rpx;
}

.btn {
  flex: 1;
  height: 84rpx;
  line-height: 84rpx;
  border-radius: 18rpx;
  font-size: 28rpx;
  border: 1rpx solid #d6dcf2;
  background: #fff;
  color: #1f2937;
}

.primary {
  background: #3a6ff7;
  color: #fff;
  border: none;
}
</style>
