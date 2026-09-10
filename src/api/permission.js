import { get, post, put } from '@/utils/request'

export function fetchPermissionTree(params = {}) {
  return get('/permission/list', params)
}

export function fetchRoles(params = {}) {
  return get('/role/list', params)
}

export function saveRolePermissions(payload) {
  return put(`/role/${payload.roleId}/permissions`, payload)
}

export function fetchPermissionList(params = {}) {
  return get('/permission/list', params)
}

export function createPermission(data) {
  return post('/permission/create', data)
}

export function updatePermission(data) {
  return put('/permission/update', data)
}

export function fetchUserMenu(params = {}) {
  return get('/user/menu', params)
}
