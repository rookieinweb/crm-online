import { defineStore } from 'pinia'
import { getUser, setUser } from '@/utils/auth'
import { ROLES } from '@/constants/roles'

function normalizeRole(profile) {
  const role = profile?.role
  if (typeof role === 'string') return role
  return role?.role_code || role?.code || ROLES.SALES
}

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: getUser() || {
      id: '',
      account: '',
      name: '销售人员',
      nickname: '',
      phone: '',
      role: ROLES.SALES,
      avatar: '',
      teamName: '销售一组'
    }
  }),
  getters: {
    userName: (state) => state.profile?.nickname || state.profile?.name || state.profile?.account || '销售',
    role: (state) => normalizeRole(state.profile),
    isManager: (state) => [ROLES.MANAGER, ROLES.ADMIN].includes(normalizeRole(state.profile))
  },
  actions: {
    setProfile(profile) {
      this.profile = profile
      setUser(profile)
    }
  }
})
