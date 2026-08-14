const TOKEN_KEY = 'zhike_token'
const USER_KEY = 'zhike_user'

export function getToken() {
  return uni.getStorageSync(TOKEN_KEY) || ''
}

export function setToken(token) {
  uni.setStorageSync(TOKEN_KEY, token)
}

export function clearToken() {
  uni.removeStorageSync(TOKEN_KEY)
  uni.removeStorageSync(USER_KEY)
}

export function getUser() {
  const raw = uni.getStorageSync(USER_KEY)
  return raw || null
}

export function setUser(user) {
  uni.setStorageSync(USER_KEY, user)
}
