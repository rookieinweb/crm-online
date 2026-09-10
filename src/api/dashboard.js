import { get } from '@/utils/request'

function toNumber(value) {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

export function normalizeOverview(data = {}) {
  return {
    effectiveTotal: toNumber(data.effectiveTotal),
    todayCreateNum: toNumber(data.todayCreateNum),
    todayFollowNum: toNumber(data.todayFollowNum),
    MonthlyTransactionVolume: toNumber(data.MonthlyTransactionVolume),
    DealNum: toNumber(data.DealNum ?? data.dealAmount ?? data.deal_amount),
    ...data
  }
}

export async function fetchDashboard(params = {}) {
  const overview = normalizeOverview(await get('/dashboard/overview', params))

  return {
    stats: overview,
    todos: [],
    visitTasks: []
  }
}

export function fetchDashboardOverview(params = {}) {
  return get('/dashboard/overview', params).then(normalizeOverview)
}

export function fetchSalesFunnel(params = {}) {
  return get('/dashboard/sales-funnel', params)
}
