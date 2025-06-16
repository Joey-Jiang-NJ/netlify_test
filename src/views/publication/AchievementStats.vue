<template>
  <div>
    <!-- 筛选区域 -->
    <el-card>
      <template #header><span>筛选</span></template>
      <el-form :inline="true">
        <el-form-item label="成果类型">
          <el-select placeholder="请选择成果类型"></el-select>
        </el-form-item>
        <el-form-item label="出版/发表时间">
          <el-date-picker type="year" placeholder="选择年度"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据概览卡片 -->
    <el-row :gutter="16" class="stats-row">
      <el-col :span="6">
        <el-card>
          <div class="stat-title">论文总数</div>
          <div class="stat-value">1,234</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-title">专著总数</div>
          <div class="stat-value">56</div>
        </el-card>
      </el-col>
       <el-col :span="6">
        <el-card>
          <div class="stat-title">核心期刊论文</div>
          <div class="stat-value">345</div>
        </el-card>
      </el-col>
       <el-col :span="6">
        <el-card>
          <div class="stat-title">总引用次数</div>
          <div class="stat-value">8,765</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区 -->
    <el-card class="chart-card">
      <template #header><span>各系成果数量</span></template>
      <Bar :data="barData" :options="chartOptions" />
    </el-card>
    
    <el-card class="chart-card">
       <template #header><span>年度成果趋势</span></template>
      <Line :data="lineData" :options="chartOptions" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Bar, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

const barData = {
  labels: ['计算机科学系', '软件工程系', '人工智能系', '数据科学系'],
  datasets: [{
    label: '成果数量',
    data: [65, 59, 80, 81],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }]
};

const lineData = {
  labels: ['2020', '2021', '2022', '2023', '2024'],
  datasets: [{
    label: '年度成果数',
    data: [120, 150, 130, 180, 210],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
</script>

<style scoped>
.stat-title {
  font-size: 14px;
  color: #606266;
}
.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}
.stats-row {
  margin-top: var(--gap-md);
}
.chart-card {
  margin-top: var(--gap-md);
}
.el-form-item {
  margin-bottom: var(--gap-md);
}
</style>
