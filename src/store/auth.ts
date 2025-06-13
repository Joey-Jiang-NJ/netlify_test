import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('user') || '{}')
  }),
  actions: {
    login(user: any) {
      this.isLoggedIn = true
      this.user = user
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.isLoggedIn = false
      this.user = {}
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
    }
  }
})
