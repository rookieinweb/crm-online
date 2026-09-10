import { del, get, post, put } from '@/utils/request'

function normalizeCustomer(item = {}) {
  const fullAddress = [item.province, item.city, item.address].filter(Boolean).join('')
  return {
    ...item,
    id: item.id,
    name: item.customer_name || item.name || item.product_name || '-',
    contactName: item.customer_name || item.contactName || '-',
    contactPhone: item.phone || item.contactPhone || '',
    industry: item.customer_source || item.industry || '',
    address: item.address || '',
    fullAddress,
    level: item.customer_level || item.level || 'C',
    status: item.customer_status || item.status || 'potential',
    ownerName: item.owner?.username || item.ownerName || '',
    lastFollowAt: item.update_time || item.create_time || item.lastFollowAt || '',
    nextFollowAt: item.next_follow_time || item.nextFollowAt || null,
    dealAmount: item.deal_amount || item.dealAmount || 0,
    follows: Array.isArray(item.follows) ? item.follows.map(normalizeFollow) : []
  }
}

function normalizeFollow(item = {}) {
  const type = item.follow_type || item.type || '电话'
  return {
    ...item,
    id: item.id || `${item.created_at || item.follow_time || Date.now()}_${item.content || ''}`,
    customerId: item.customer_id || item.customerId,
    customerName: item.customer_name || item.customerName || '',
    type,
    typeLabel: type,
    content: item.content || '',
    createdAt: item.created_at || item.follow_time || item.createdAt || '',
    nextFollowAt: item.next_follow_time || item.nextFollowAt || '',
    creatorName: item.creator?.username || item.creatorName || ''
  }
}

function normalizeCustomerList(res = {}) {
  const list = Array.isArray(res) ? res : res.list || []
  return {
    list: list.map(normalizeCustomer),
    total: Array.isArray(res) ? res.length : res.total || list.length
  }
}

function toBackendQuery(params = {}) {
  const keyword = params.keyword || params.customer_name || ''
  const status = params.status === 'all' ? '' : params.status || params.customer_status || ''
  return {
    page: params.page || 1,
    size: params.size || 10,
    customer_name: keyword,
    phone: params.phone || (/^\d+$/.test(keyword) ? keyword : ''),
    customer_status: status
  }
}

function toBackendCustomer(data = {}) {
  return {
    id: data.id,
    customer_name: data.customer_name || data.name || data.contactName,
    phone: data.phone || data.contactPhone,
    customer_source: data.customer_source || data.industry || '微信',
    customer_status: data.customer_status || data.status || 'potential',
    customer_level: data.customer_level || data.level || 'B',
    product_name: data.product_name || data.name || '',
    province: data.province || '',
    city: data.city || '',
    address: data.address || '',
    owner_id: data.owner_id || data.owner?.id || '',
    remark: data.remark || '',
    deal_amount: data.deal_amount || data.dealAmount || 0
  }
}

function toBackendFollow(data = {}) {
  return {
    customer_id: data.customer_id || data.customerId,
    follow_type: data.follow_type || data.type || '电话',
    follow_time: data.follow_time || data.createdAt || new Date().toISOString(),
    title: data.title || data.follow_type || data.type || '跟进记录',
    content: data.content || '',
    result: data.result || '',
    next_follow_time: data.next_follow_time || data.nextFollowAt || ''
  }
}

export async function fetchCustomers(params = {}) {
  return normalizeCustomerList(await get('/customer/list', toBackendQuery(params)))
}

export async function fetchCustomer(id) {
  return normalizeCustomer(await get(`/customer/detail/${id}`))
}

export async function createCustomer(data) {
  const res = await post('/customer/create', toBackendCustomer(data))
  return normalizeCustomer(res || data)
}

export async function updateCustomer(data) {
  const res = await put('/customer/update', toBackendCustomer(data))
  return normalizeCustomer(res || data)
}

export function deleteCustomer(id) {
  return del(`/customer/${id}`)
}

export function createFollow(data) {
  return post('/customer/create-follow', toBackendFollow(data))
}

export { normalizeCustomer, normalizeFollow }
