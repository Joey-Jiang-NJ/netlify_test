<template>
  <div class="funding-info-container">
    <!-- 筛选区域 -->
    <FundingFilter />

    <!-- 查询结果汇总卡片 -->
    <el-row :gutter="20" class="summary-cards">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="card-content">
            <div class="card-label">总到款项目数</div>
            <div class="card-value">{{ fundingSummary.count }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="card-content">
            <div class="card-label">总到款金额 (万元)</div>
            <div class="card-value">{{ fundingSummary.totalAmount.toFixed(2) }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="card-content">
            <div class="card-label">最大单笔金额 (万元)</div>
            <div class="card-value">{{ fundingSummary.maxAmount.toFixed(2) }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 查询结果明细表格 -->
    <el-card class="result-card" shadow="never">
      <el-table :data="filteredFunding" stripe style="width: 100%" border>
        <el-table-column prop="projectId" label="项目编号" width="180" />
        <el-table-column prop="projectName" label="项目名称" width="250" show-overflow-tooltip />
        <el-table-column prop="leader" label="负责人" width="120" />
        <el-table-column prop="date" label="到款时间" width="150" />
        <el-table-column prop="amount" label="到款金额(万元)" width="150" />
        <el-table-column prop="status" label="财务核对状态" width="150" />
        <el-table-column prop="source" label="到款来源" />
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="showProjectDetails(scope.row.projectId)">查看项目详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Project Details Dialog -->
    <el-dialog v-model="detailsDialogVisible" title="项目详情" width="60%">
      <div v-if="selectedProject" class="project-details">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="项目名称">{{ selectedProject.name }}</el-descriptions-item>
          <el-descriptions-item label="学校项目编号">{{ selectedProject.schoolId }}</el-descriptions-item>
          <el-descriptions-item label="负责人">{{ selectedProject.leader }}</el-descriptions-item>
          <el-descriptions-item label="院系">{{ selectedProject.department }}</el-descriptions-item>
          <el-descriptions-item label="项目类别">{{ selectedProject.category }}</el-descriptions-item>
          <el-descriptions-item label="项目分类">{{ selectedProject.classification }}</el-descriptions-item>
          <el-descriptions-item label="批准经费(万)">
            <el-tag type="success">{{ selectedProject.approvedFund }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="累计到款经费(万)">
            <el-tag type="warning">{{ selectedProject.receivedFund }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="项目开始时间">{{ selectedProject.startDate }}</el-descriptions-item>
          <el-descriptions-item label="项目完成时间">{{ selectedProject.endDate }}</el-descriptions-item>
          <el-descriptions-item label="下达单位" :span="2">{{ selectedProject.sourceUnit }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="detailsDialogVisible = false">关 闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Upload, UploadFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import FundingFilter from '../../components/project/FundingFilter.vue';
import { useProjectStore } from '../../store/project';
import type { Project } from '../../types/project';

const projectStore = useProjectStore();
const detailsDialogVisible = ref(false);
const selectedProject = ref<Project | null>(null);

const filteredFunding = computed(() => {
  const { funding, activeFilters } = projectStore;
  const f = activeFilters.funding;

  if (!funding) return [];

  return funding.filter(item => {
    const itemDate = new Date(item.date);
    
    const yearMatch = !f.year || itemDate.getFullYear() === parseInt(f.year, 10);
    const dateRangeMatch = !f.dateRange || (itemDate >= new Date(f.dateRange[0]) && itemDate <= new Date(f.dateRange[1]));
    const schoolIdMatch = !f.schoolId || item.projectId.includes(f.schoolId);
    const nameMatch = !f.name || item.projectName.includes(f.name);
    const leaderMatch = !f.leader || item.leader.includes(f.leader);
    const statusMatch = !f.status || item.status === f.status;

    return yearMatch && dateRangeMatch && schoolIdMatch && nameMatch && leaderMatch && statusMatch;
  });
});

const showProjectDetails = (projectId: string) => {
  const project = projectStore.projects.find(p => p.schoolId === projectId);
  if (project) {
    selectedProject.value = project;
    detailsDialogVisible.value = true;
  }
};

const fundingSummary = computed(() => {
  const fundingList = filteredFunding.value;
  if (!fundingList || fundingList.length === 0) {
    return { count: 0, totalAmount: 0, maxAmount: 0 };
  }

  const totalAmount = fundingList.reduce((sum, item) => sum + item.amount, 0);
  const maxAmount = Math.max(...fundingList.map(item => item.amount));
  
  const count = new Set(fundingList.map(item => item.projectId)).size;

  return { count, totalAmount, maxAmount };
});
</script>

<style scoped>
.funding-info-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}
.action-card {
  border: none;
  margin-bottom: var(--gap-md);
}
.summary-cards {
  margin-bottom: var(--gap-md);
}
.card-content {
  text-align: center;
}
.card-label {
  color: #606266;
  font-size: 14px;
  margin-bottom: 10px;
}
.card-value {
  font-size: 24px;
  font-weight: bold;
}
.result-card {
  border: none;
}
.project-details {
  padding: 0 10px;
}
</style>
