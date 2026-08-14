import { onShow } from '@dcloudio/uni-app'

export function useTabBar(index) {
  onShow(() => {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    if (page && typeof page.getTabBar === 'function') {
      const tabBar = page.getTabBar()
      if (tabBar && typeof tabBar.setSelected === 'function') {
        tabBar.setSelected(index)
      }
    }
  })
}
