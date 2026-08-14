const EARTH_RADIUS = 6371000

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

export const CHECKIN_MAX_DISTANCE = 500

export function isValidCheckinDistance(distance) {
  return distance <= CHECKIN_MAX_DISTANCE
}
