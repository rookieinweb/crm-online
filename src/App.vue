<script>
import { getToken } from '@/utils/auth'

export default {
  onLaunch() {
    console.log('智客Online销售端启动')
    if (getToken()) {
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/index/index' })
      }, 0)
    }
  }
}
</script>

<style>
page {
  background: #f4f6fa;
  color: #111827;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

button {
  padding: 0;
  margin: 0;
  border-radius: 0;
  background: transparent;
  line-height: normal;
}

button::after {
  border: none;
}
</style>
