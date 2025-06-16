<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>查询筛选</span>
      </div>
    </template>
    <!-- 筛选区域 -->
    <el-form :inline="true" :model="filters">
      <el-form-item label="成果名称">
        <el-input v-model="filters.name" placeholder="请输入成果名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="table-card">
    <template #header>
      <div class="card-header">
        <span>数据操作</span>
        <div class="actions">
          <el-button type="primary" @click="handleOpenForm()">新增成果</el-button>
          <el-button>批量导入</el-button>
          <el-button>导出数据</el-button>
        </div>
      </div>
    </template>
    <!-- 查询结果表格 -->
    <el-table 
      v-loading="loading" 
      :data="visiblePublications" 
      stripe 
      style="width: 100%;"
    >
      <el-table-column prop="成果名称" label="成果名称"></el-table-column>
      <el-table-column label="第一作者">
        <template #default="{ row }">
          {{ row.作者列表[0]?.name }}
        </template>
      </el-table-column>
      <el-table-column prop="成果类型" label="成果类型"></el-table-column>
      <el-table-column prop="院系" label="院系"></el-table-column>
      <el-table-column prop="出版/发表时间" label="出版/发表时间"></el-table-column>
      <el-table-column label="刊物/出版单位">
         <template #default="{ row }">
          {{ row['刊物/会议名称'] || row.出版单位 }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button link type="primary" size="small">详情</el-button>
          <el-button 
            link 
            type="primary" 
            size="small" 
            @click="handleOpenForm(row)"
            :disabled="!canEditOrDelete(row)"
          >
            编辑
          </el-button>
          <el-button 
            link 
            type="primary" 
            size="small" 
            @click="handleDelete(row.id)"
            :disabled="!canEditOrDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  
  <PublicationForm 
    v-model:visible="isFormVisible"
    :initial-data="currentPublication"
    @submit="handleFormSubmit"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { usePublicationStore } from '@/store/publication';
import { storeToRefs } from 'pinia';
import PublicationForm from '@/components/publication/PublicationForm.vue';
import type { UnifiedPublication } from '@/types/publication';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
// Let's assume the logged-in teacher's name is "张三" for demo purposes.
const currentUserName = '张三'; 

const canEditOrDelete = (publication: UnifiedPublication) => {
  if (authStore.isAdmin) {
    return true;
  }
  if (authStore.isTeacher) {
    return publication.作者列表.some(author => author.name === currentUserName);
  }
  return false;
};

const filters = reactive({
  name: '',
});

const publicationStore = usePublicationStore();
const { publicationList, loading } = storeToRefs(publicationStore);

// 只显示未被软删除的数据
const visiblePublications = computed(() => 
  publicationList.value.filter(p => !p.isDeleted)
);

const isFormVisible = ref(false);
const currentPublication = ref<UnifiedPublication | null>(null);

const handleOpenForm = (publication: UnifiedPublication | null = null) => {
  currentPublication.value = publication;
  isFormVisible.value = true;
};

const handleFormSubmit = (formData: Partial<UnifiedPublication>) => {
  if (formData.id) {
    publicationStore.updatePublication(formData as UnifiedPublication);
    ElMessage.success('更新成功');
  } else {
    publicationStore.addPublication(formData as Omit<UnifiedPublication, 'id'>);
    ElMessage.success('新增成功');
  }
  isFormVisible.value = false;
};

const handleDelete = (id: string) => {
  ElMessageBox.confirm('确定要删除这条成果吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    publicationStore.deletePublication(id);
    ElMessage.success('删除成功');
  });
};

onMounted(() => {
  publicationStore.fetchPublications();
});

const handleSearch = () => {
  publicationStore.fetchPublications(filters);
};

const handleReset = () => {
  filters.name = '';
  publicationStore.fetchPublications();
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-card {
  margin-top: var(--gap-md);
}
.actions {
  display: flex;
  gap: var(--gap-sm);
}
.el-form-item {
  margin-bottom: var(--gap-md);
}
</style>
