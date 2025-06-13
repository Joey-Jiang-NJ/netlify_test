<template>
  <aside class="app-sidebar">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#343a40"
      class="el-menu-vertical-demo"
      default-active="/project/info"
      text-color="#fff"
      router
    >
      <el-sub-menu index="/project">
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>科研项目管理</span>
        </template>
        <el-menu-item index="/project/info">
          <el-icon><DataLine /></el-icon>
          <span>项目信息查询</span>
        </el-menu-item>
        <el-menu-item index="/project/funding">
          <el-icon><Money /></el-icon>
          <span>到款信息查询</span>
        </el-menu-item>
        <el-menu-item index="/project/stats">
          <el-icon><PieChart /></el-icon>
          <span>项目统计</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </aside>
</template>

<script setup lang="ts">
import {
  DataLine,
  Money,
  PieChart,
  Menu
} from '@element-plus/icons-vue'
</script>

<style scoped>
.app-sidebar {
  position: fixed;
  top: var(--header-height);
  left: 0;
  width: var(--sidebar-width);
  height: calc(100vh - var(--header-height));
  background-color: #343a40;
  overflow-y: auto;
  z-index: 90;
}

.el-menu {
  border-right: none;
}
</style>
