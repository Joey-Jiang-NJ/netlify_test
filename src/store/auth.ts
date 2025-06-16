import { defineStore } from 'pinia'

interface User {
  id?: string;
  name?: string;
  role?: 'admin' | 'teacher' | 'user';
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('user') || '{}') as User
  }),
  getters: {
    isAdmin: (state) => state.user.role === 'admin',
    isTeacher: (state) => state.user.role === 'teacher'
  },
  actions: {
    login(user: User) {
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
