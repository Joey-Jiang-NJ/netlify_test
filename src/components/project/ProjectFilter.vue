<template>
  <el-card shadow="never" class="filter-card">
    <el-form :model="projectStore.filterInputs.project" label-width="100px" class="filter-form">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="立项年份">
            <el-date-picker v-model="projectStore.filterInputs.project.year" type="year" placeholder="选择立项年份" style="width: 100%;" value-format="YYYY" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目起止时间">
            <el-date-picker v-model="projectStore.filterInputs.project.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号">
            <el-input v-model="projectStore.filterInputs.project.schoolId" placeholder="请输入学校项目编号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input v-model="projectStore.filterInputs.project.name" placeholder="请输入项目名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="负责人">
            <el-input v-model="projectStore.filterInputs.project.leader" placeholder="请输入负责人" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目类别">
             <el-select v-model="projectStore.filterInputs.project.category" placeholder="选择项目类别" clearable style="width: 100%;">
              <el-option label="横向" value="横向" />
              <el-option label="纵向" value="纵向" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="院系">
            <el-select v-model="projectStore.filterInputs.project.department" placeholder="选择院系" clearable style="width: 100%;">
              <el-option label="人力资源与组织行为系" value="人力资源与组织行为系" />
              <el-option label="会计系" value="会计系" />
              <el-option label="创新创业与战略系" value="创新创业与战略系" />
              <el-option label="市场营销系" value="市场营销系" />
              <el-option label="技术经济与管理系" value="技术经济与管理系" />
              <el-option label="管理科学与工程系" value="管理科学与工程系" />
              <el-option label="经济系" value="经济系" />
              <el-option label="金融系" value="金融系" />
              <el-option label="领导力与组织管理系" value="领导力与组织管理系" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目分类">
            <el-select v-model="projectStore.filterInputs.project.classification" placeholder="选择项目分类" clearable style="width: 100%;">
              <el-option label="国家社科基金" value="国家社科基金" />
              <el-option label="国家自然科学基金" value="国家自然科学基金" />
              <el-option label="国家计划+部委等" value="国家计划+部委等" />
              <el-option label="国际合作项目" value="国际合作项目" />
              <el-option label="教育部" value="教育部" />
              <el-option label="校基金" value="校基金" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="基金类别">
            <el-select v-model="projectStore.filterInputs.project.fundType" placeholder="选择基金类别" clearable style="width: 100%;">
              <el-option label="企业合作基金" value="企业合作基金" />
              <el-option label="面上项目" value="面上项目" />
              <el-option label="青年基金A(杰青)" value="青年基金A(杰青)" />
              <el-option label="青年基金B(优青)" value="青年基金B(优青)" />
              <el-option label="青年基金C" value="青年基金C" />
              <el-option label="重大项目" value="重大项目" />
              <el-option label="重点项目" value="重点项目" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row v-if="projectStore.filterInputs.project.fundType === '其他'" :gutter="20">
        <el-col :span="8">
          <el-form-item label="其他基金类别">
            <el-input v-model="projectStore.filterInputs.project.otherFundType" placeholder="请输入其他基金类别" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align: right;">
          <el-button type="primary" :icon="Search" @click="projectStore.applyFilters('project')">查 询</el-button>
          <el-button :icon="Refresh" @click="projectStore.resetFilters('project')">重 置</el-button>
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
