const EARTH_RADIUS = 6371000
export const CHECKIN_MAX_DISTANCE = 1000

// TODO: 替换为腾讯位置服务 WebService API key，并在微信后台配置 request 合法域名 https://apis.map.qq.com。
const TENCENT_MAP_KEY = ''

export function calcDistance(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return Math.round(EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success: (res) => {
        resolve({
          latitude: res.latitude,
          longitude: res.longitude,
          address: ''
        })
      },
      fail: (err) => {
        reject(new Error(err.errMsg || '获取定位失败，请授权位置权限'))
      }
    })
  })
}

export function geocodeAddress(address) {
  return new Promise((resolve, reject) => {
    if (!address) {
      reject(new Error('客户地址不能为空'))
      return
    }
    if (!TENCENT_MAP_KEY) {
      reject(new Error('请先配置腾讯地图 key，用于客户地址解析'))
      return
    }

    uni.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      method: 'GET',
      data: {
        address,
        key: TENCENT_MAP_KEY
      },
      success(res) {
        const data = res.data || {}
        const location = data.result?.location
        if (data.status === 0 && location?.lat && location?.lng) {
          resolve({
            latitude: location.lat,
            longitude: location.lng,
            address
          })
          return
        }
        reject(new Error(data.message || '客户地址解析失败'))
      },
      fail(err) {
        reject(new Error(err.errMsg || '客户地址解析失败'))
      }
    })
  })
}

export async function resolveCustomerLocation(customer) {
  if (customer?.latitude && customer?.longitude) {
    return {
      latitude: customer.latitude,
      longitude: customer.longitude,
      address: customer.address || ''
    }
  }
  return geocodeAddress(customer?.address)
}

export function isValidCheckinDistance(distance) {
  return Number(distance) <= CHECKIN_MAX_DISTANCE
}
