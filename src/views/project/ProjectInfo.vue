<template>
  <div class="project-info-container">
    <!-- 筛选区域 -->
    <ProjectFilter />

    <!-- 操作按钮区域 -->
    <el-card class="action-card" shadow="never">
       <el-button type="primary" :icon="Plus" @click="openDialog('add')">新增项目</el-button>
       <el-button :icon="Upload" @click="importDialogVisible = true">批量导入</el-button>
    </el-card>
    
    <!-- 查询结果表格 -->
    <el-card class="result-card" shadow="never">
      <el-table :data="filteredProjects" stripe style="width: 100%" border>
        <el-table-column prop="display" label="是否外网展示" width="120" />
        <el-table-column prop="schoolId" label="学校项目编号" width="150" />
        <el-table-column prop="name" label="项目名称" width="250" show-overflow-tooltip />
        <el-table-column prop="personnelId" label="人员ID" width="100" />
        <el-table-column prop="leader" label="负责人" width="100" />
        <el-table-column prop="department" label="院系" width="180" />
        <el-table-column prop="category" label="项目类别" width="120" />
        <el-table-column prop="classification" label="项目分类" width="150" />
        <el-table-column prop="fundType" label="基金类别" width="150" />
        <el-table-column prop="sourceUnit" label="下达单位" width="180" show-overflow-tooltip />
        <el-table-column prop="startDate" label="项目开始时间" width="150" />
        <el-table-column prop="endDate" label="项目完成时间" width="150" />
        <el-table-column prop="approvedFund" label="批准经费(万)" width="140" />
        <el-table-column prop="receivedFund" label="累计到款经费(万)" width="160" />
        <el-table-column prop="approvalNumber" label="批准号" width="150" />
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="openDialog('edit', scope.row)">编辑</el-button>
            <el-button link type="danger" size="small">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Add/Edit Dialog -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="70%" :close-on-click-modal="false">
      <el-form :model="projectForm" :rules="rules" ref="projectFormRef" label-width="140px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="projectForm.name" placeholder="请输入项目名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学校项目编号" prop="schoolId">
              <el-input v-model="projectForm.schoolId" placeholder="请输入学校项目编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="负责人" prop="leader">
              <el-input v-model="projectForm.leader" placeholder="请输入负责人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人员ID" prop="personnelId">
              <el-input v-model="projectForm.personnelId" placeholder="请输入人员ID" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="院系" prop="department">
              <el-select v-model="projectForm.department" placeholder="请选择院系" style="width: 100%;">
                <el-option label="人力资源与组织行为系" value="人力资源与组织行为系" />
                <el-option label="会计系" value="会计系" />
                <!-- Add all other departments -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="项目类别" prop="category">
              <el-select v-model="projectForm.category" placeholder="请选择项目类别" style="width: 100%;">
                <el-option label="横向" value="横向" />
                <el-option label="纵向" value="纵向" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="项目开始时间" prop="startDate">
                    <el-date-picker v-model="projectForm.startDate" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="项目完成时间" prop="endDate">
                    <el-date-picker v-model="projectForm.endDate" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="批准经费(万元)" prop="approvedFund">
                    <el-input-number v-model="projectForm.approvedFund" :precision="2" :step="1" style="width: 100%;" />
                </el-form-item>
            </el-col>
             <el-col :span="12">
                <el-form-item label="是否外网展示" prop="display">
                  <el-radio-group v-model="projectForm.display">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                  </el-radio-group>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- Other fields like classification, fundType etc. should be added here -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button @click="resetForm">重 置</el-button>
          <el-button type="primary" @click="submitForm">提 交</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Import Dialog -->
    <el-dialog v-model="importDialogVisible" title="批量导入项目" width="500px">
      <el-upload
        class="upload-demo"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :on-success="() => ElMessage.success('上传成功！')"
        :on-error="() => ElMessage.error('上传失败，请重试。')"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或 <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            请上传 .xls 或 .xlsx 格式的文件 (这是一个模拟上传)
          </div>
        </template>
      </el-upload>
      <template #footer>
        <el-button @click="importDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Plus, Upload, UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import ProjectFilter from '../../components/project/ProjectFilter.vue'
import { useProjectStore } from '../../store/project'
import type { Project } from '../../types/project'

const projectStore = useProjectStore()

const filteredProjects = computed(() => {
  const { projects, activeFilters } = projectStore;
  const f = activeFilters.project;

  if (!projects) return [];

  return projects.filter(p => {
    const startDate = new Date(p.startDate);
    const endDate = new Date(p.endDate);
    
    const yearMatch = !f.year || startDate.getFullYear() === parseInt(f.year, 10);
    const dateRangeMatch = !f.dateRange || (startDate >= new Date(f.dateRange[0]) && endDate <= new Date(f.dateRange[1]));
    const schoolIdMatch = !f.schoolId || p.schoolId.includes(f.schoolId);
    const nameMatch = !f.name || p.name.includes(f.name);
    const leaderMatch = !f.leader || p.leader.includes(f.leader);
    const categoryMatch = !f.category || p.category === f.category;
    const classificationMatch = !f.classification || p.classification === f.classification;
    const fundTypeMatch = !f.fundType || p.fundType === f.fundType;
    const departmentMatch = !f.department || p.department === f.department;

    return yearMatch && dateRangeMatch && schoolIdMatch && nameMatch && leaderMatch && categoryMatch && classificationMatch && fundTypeMatch && departmentMatch;
  });
});

const dialogVisible = ref(false)
const dialogTitle = ref('')
const projectFormRef = ref<FormInstance>()
const importDialogVisible = ref(false)

const projectForm = reactive<Partial<Project>>({})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  schoolId: [{ required: true, message: '请输入学校项目编号', trigger: 'blur' }],
  leader: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
  // ... other rules
})

const openDialog = (mode: 'add' | 'edit', rowData?: any) => {
  dialogVisible.value = true
  dialogTitle.value = mode === 'add' ? '新增项目' : '编辑项目'
  if (mode === 'edit') {
    Object.assign(projectForm, rowData)
  } else {
    // Reset form for 'add' mode
    projectFormRef.value?.resetFields()
  }
}

const submitForm = async () => {
  if (!projectFormRef.value) return
  await projectFormRef.value.validate((valid) => {
    if (valid) {
      console.log('submit!', projectForm)
      dialogVisible.value = false
    }
  })
}

const closeDialog = () => {
  dialogVisible.value = false;
  projectFormRef.value?.resetFields();
}

const resetForm = () => {
    projectFormRef.value?.resetFields();
}
</script>

<style scoped>
.project-info-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}
.action-card, .result-card {
  border: none;
}
</style>
