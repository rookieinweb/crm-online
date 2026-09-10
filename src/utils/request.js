import { getToken, clearToken } from './auth'

const DEFAULT_ERROR_MESSAGE = '请求失败，请稍后重试'
const BASE_URL = import.meta.env.VITE_API_URL || ''

function goLogin() {
  const pages = typeof getCurrentPages === 'function' ? getCurrentPages() : []
  const current = pages[pages.length - 1]
  if (current?.route === 'pages/login/index') return
  uni.reLaunch({ url: '/pages/login/index' })
}

function normalizeApiBody(body) {
  if (body && typeof body === 'object' && 'code' in body) {
    if (body.code !== 200) {
      throw new Error(body.msg || body.message || DEFAULT_ERROR_MESSAGE)
    }

    if ('token' in body && 'user' in body) {
      return { token: body.token, user: body.user }
    }

    return body.data ?? body.token ?? null
  }

  if (body && typeof body === 'object' && 'success' in body) {
    if (!body.success) {
      throw new Error(body.message || DEFAULT_ERROR_MESSAGE)
    }
    return body.data
  }

  return body
}

function getErrorMessage(data, fallback = DEFAULT_ERROR_MESSAGE) {
  return data?.message || data?.msg || fallback
}

function request(options) {
  return new Promise((resolve, reject) => {
    const token = getToken()
    uni.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.header
      },
      success(res) {
        const { statusCode, data } = res
        if (statusCode === 401) {
          clearToken()
          goLogin()
          reject(new Error('登录已过期，请重新登录'))
          return
        }

        if (statusCode >= 200 && statusCode < 300) {
          try {
            resolve(normalizeApiBody(data))
          } catch (e) {
            reject(e)
          }
          return
        }

        reject(new Error(getErrorMessage(data)))
      },
      fail(err) {
        reject(new Error(err.errMsg || DEFAULT_ERROR_MESSAGE))
      }
    })
  })
}

export function get(url, data) {
  return request({ url, method: 'GET', data })
}

export function post(url, data) {
  return request({ url, method: 'POST', data })
}

export function put(url, data) {
  return request({ url, method: 'PUT', data })
}

export function del(url, data) {
  return request({ url, method: 'DELETE', data })
}

export default request
