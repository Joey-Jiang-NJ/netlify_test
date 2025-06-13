<template>
  <div class="stats-dashboard">
    <el-card shadow="never" class="export-card">
       <template #header>
        <div class="card-header">
          <span>报表导出</span>
        </div>
      </template>
      <div class="button-group">
        <el-button :icon="Download" @click="handleExport('科研立项情况')">导出科研立项情况</el-button>
        <el-button :icon="Download" @click="handleExport('各系科研立项分布情况')">导出各系科研立项分布情况</el-button>
        <el-button :icon="Download" @click="handleExport('科研到款情况')">导出科研到款情况</el-button>
        <el-button :icon="Download" @click="handleExport('各系科研到款分布情况')">导出各系科研到款分布情况</el-button>
      </div>
    </el-card>

    <el-card shadow="never">
      <template #header><span>年度立项情况</span></template>
      <v-chart class="chart" :option="chartOptions.annualProjects" autoresize />
    </el-card>

    <el-card shadow="never">
      <template #header><span>各系立项分布</span></template>
      <v-chart class="chart" :option="chartOptions.departmentProjects" autoresize />
    </el-card>

    <el-card shadow="never">
      <template #header><span>年度到款情况</span></template>
      <v-chart class="chart" :option="chartOptions.annualFunding" autoresize />
    </el-card>

    <el-card shadow="never">
      <template #header><span>各系到款分布</span></template>
      <v-chart class="chart" :option="chartOptions.departmentFunding" autoresize />
    </el-card>

    <el-dialog
      v-model="exportDialogVisible"
      title="报表导出"
      width="500"
    >
      <span>{{ exportMessage }}</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="exportDialogVisible = false">
            好的
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart, LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { reactive, ref } from 'vue';
import { Download } from '@element-plus/icons-vue'

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const exportDialogVisible = ref(false);
const exportMessage = ref('');

const handleExport = (reportName: string) => {
  exportMessage.value = `正在为您导出《${reportName}》报表... \n\n（这是一个模拟功能，实际导出将在后台处理。）`;
  exportDialogVisible.value = true;
};

const chartOptions = reactive({
  annualProjects: {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
    yAxis: { type: 'value' },
    series: [{ name: '立项数', type: 'line', data: [2, 3, 1, 5, 4, 2] }]
  },
  departmentProjects: {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: {},
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: ['会计系', '金融系', '市场营销系'] },
    series: [
      { name: '横向', type: 'bar', stack: 'total', data: [1, 0, 0] },
      { name: '纵向', type: 'bar', stack: 'total', data: [0, 1, 1] }
    ]
  },
  annualFunding: {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['3月', '4月', '7月', '9月'] },
    yAxis: { type: 'value', axisLabel: { formatter: '{value} W' } },
    series: [{ name: '到款金额', type: 'line', data: [10, 40, 50, 10] }]
  },
  departmentFunding: {
     tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['会计系', '金融系', '市场营销系'] },
    yAxis: { type: 'value', axisLabel: { formatter: '{value} W' } },
    series: [{ name: '总到款', type: 'bar', data: [20, 50, 40] }]
  }
});
</script>

<style scoped>
.stats-dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chart {
  height: 300px;
}
.export-card {
  margin-bottom: var(--gap-lg);
}
.button-group .el-button {
  margin: 0 10px 10px 0;
}
</style>
