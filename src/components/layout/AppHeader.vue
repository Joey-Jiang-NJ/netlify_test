<template>
  <header class="app-header">
    <div class="logo">科研项目管理系统</div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :icon="UserFilled" :size="30" class="user-avatar" />
          <span class="user-name">{{ authStore.user.name }}</span>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { UserFilled, ArrowDown } from '@element-plus/icons-vue'
import { useAuthStore } from '../../store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background-color: #ffffff;
  color: #303133;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 100;
  border-bottom: 1px solid #e6e6e6;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.right-menu {
  display: flex;
  align-items: center;
}

.avatar-container {
  cursor: pointer;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
}

.user-avatar {
  margin-right: 10px;
}

.user-name {
  font-size: 14px;
  margin-right: 5px;
}
</style>
