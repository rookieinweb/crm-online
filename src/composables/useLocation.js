import { getCurrentLocation, calcDistance } from '@/utils/location'

export function useLocation() {
  async function locate(target) {
    const current = await getCurrentLocation()
    let distance = null
    if (target?.latitude && target?.longitude) {
      distance = calcDistance(
        current.latitude,
        current.longitude,
        target.latitude,
        target.longitude
      )
    }
    return { ...current, distance }
  }

  return { locate, calcDistance }
}
