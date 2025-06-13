<template>
  <el-card shadow="never" class="filter-card">
    <el-form :model="projectStore.filterInputs.funding" label-width="100px" class="filter-form">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="到款年份">
            <el-date-picker v-model="projectStore.filterInputs.funding.year" type="year" placeholder="选择到款年份" style="width: 100%;" value-format="YYYY" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到款时间范围">
            <el-date-picker v-model="projectStore.filterInputs.funding.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号">
            <el-input v-model="projectStore.filterInputs.funding.schoolId" placeholder="请输入项目编号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input v-model="projectStore.filterInputs.funding.name" placeholder="请输入项目名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="负责人">
            <el-input v-model="projectStore.filterInputs.funding.leader" placeholder="请输入负责人" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="财务核对状态">
            <el-select v-model="projectStore.filterInputs.funding.status" placeholder="选择核对状态" clearable style="width: 100%;">
              <el-option label="已核对" value="已核对" />
              <el-option label="未核对" value="未核对" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align: right;">
          <el-button type="primary" :icon="Search" @click="projectStore.applyFilters('funding')">查 询</el-button>
          <el-button :icon="Refresh" @click="projectStore.resetFilters('funding')">重 置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { Search, Refresh } from '@element-plus/icons-vue'
import { useProjectStore } from '../../store/project'

const projectStore = useProjectStore()
</script>

<style scoped>
.filter-card {
  margin-bottom: var(--gap-md);
  border: none;
}
.el-form-item {
  margin-bottom: 18px;
}
</style>
