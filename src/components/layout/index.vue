<template>
  <div class="common-layout">
    <AppHeader />
    <AppSidebar />
    <main class="main-content">
      <AppBreadcrumb />
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import AppBreadcrumb from './AppBreadcrumb.vue'
</script>

<style scoped>
.main-content {
  margin-top: var(--header-height);
  margin-left: var(--sidebar-width);
  padding: var(--content-padding);
  height: calc(100vh - var(--header-height));
  overflow-y: auto;
}
</style> 