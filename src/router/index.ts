import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { useAuthStore } from '../store/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../components/layout/index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { title: '首页' }
      },
      {
        path: 'project',
        name: 'Project',
        redirect: '/project/info',
        meta: { title: '科研项目管理' },
        children: [
          {
            path: 'info',
            name: 'ProjectInfo',
            component: () => import('../views/project/ProjectInfo.vue'),
            meta: { title: '项目信息查询' }
          },
          {
            path: 'funding',
            name: 'FundingInfo',
            component: () => import('../views/project/FundingInfo.vue'),
            meta: { title: '到款信息查询' }
          },
          {
            path: 'stats',
            name: 'ProjectStats',
            component: () => import('../views/project/ProjectStats.vue'),
            meta: { title: '项目统计' }
          }
        ]
      },
      {
        path: 'publication',
        name: 'Publication',
        redirect: '/publication/info',
        meta: { title: '论文专著管理' },
        children: [
          {
            path: 'info',
            name: 'PublicationInfo',
            component: () => import('../views/publication/PublicationInfo.vue'),
            meta: { title: '论文专著信息' }
          },
          {
            path: 'accepted',
            name: 'AcceptedPapers',
            component: () => import('../views/publication/AcceptedPapers.vue'),
            meta: { title: '已录用论文' }
          },
          {
            path: 'benchmark',
            name: 'BenchmarkJournals',
            component: () => import('../views/publication/BenchmarkJournals.vue'),
            meta: { title: '标杆期刊' }
          },
          {
            path: 'stats',
            name: 'PublicationStats',
            component: () => import('../views/publication/AchievementStats.vue'),
            meta: { title: '成果统计' }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { title: '登录' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isLoggedIn

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
