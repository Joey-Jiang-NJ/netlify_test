<template>
  <div>
    <h1>Login Page</h1>
    <el-button type="primary" @click="login">Login</el-button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const login = () => {
  authStore.login({ name: '科研管理员' });
  router.push('/');
}
</script> 