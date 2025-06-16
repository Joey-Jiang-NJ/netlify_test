<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="在列论文查询" name="query">
      <el-card>
        <template #header><span>筛选区</span></template>
        <el-form :inline="true">
          <el-form-item label="成果名称">
            <el-input placeholder="请输入成果名称"></el-input>
          </el-form-item>
          <el-form-item label="刊物名称">
            <el-input placeholder="请输入刊物名称"></el-input>
          </el-form-item>
           <el-form-item label="期刊目录类型">
            <el-select placeholder="请选择">
              <el-option label="UTD" value="utd"></el-option>
              <el-option label="FT" value="ft"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="result-card">
        <template #header><span>结果表格</span></template>
        <el-table :data="[]" stripe>
          <el-table-column prop="name" label="成果名称"></el-table-column>
          <el-table-column prop="journal" label="刊物名称"></el-table-column>
          <el-table-column prop="date" label="出版/发表时间"></el-table-column>
          <el-table-column prop="type" label="期刊目录类型"></el-table-column>
        </el-table>
      </el-card>
    </el-tab-pane>

    <el-tab-pane label="期刊目录维护" name="maintenance" v-if="authStore.isAdmin">
      <el-card>
         <template #header>
          <div class="card-header">
            <span>期刊列表</span>
            <el-button type="primary">新增期刊</el-button>
          </div>
        </template>
        <el-table :data="[]" stripe>
          <el-table-column prop="name" label="刊物名称"></el-table-column>
          <el-table-column prop="publisher" label="发行单位"></el-table-column>
          <el-table-column prop="visible" label="是否显示"></el-table-column>
          <el-table-column prop="notes" label="备注"></el-table-column>
          <el-table-column label="操作">
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="primary" size="small">删除</el-button>
          </el-table-column>
        </el-table>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

const activeTab = ref('query');
const authStore = useAuthStore();
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.result-card {
  margin-top: var(--gap-md);
}
.el-form-item {
  margin-bottom: var(--gap-md);
}
</style>
