import { get, post } from '@/utils/request'

export function login(data) {
  return post('/auth/login', data)
}

export function register(data) {
  const {
    username,
    password,
    phone,
    email,
    avatar,
    nickname,
    birth_date,
    id_card,
    gender,
    other,
    role_id
  } = data

  return post('/user/register', {
    username,
    password,
    phone,
    email,
    avatar,
    nickname,
    birth_date,
    id_card,
    gender,
    other,
    role_id
  })
}

export function fetchUsers(params = {}) {
  return get('/user', params)
}
