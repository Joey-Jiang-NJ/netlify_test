<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>已接收论文列表</span>
      </div>
    </template>
    
    <el-table
      v-loading="loading"
      :data="acceptedList"
      stripe
      style="width: 100%;"
    >
      <el-table-column prop="成果名称" label="成果名称"></el-table-column>
      <el-table-column label="第一作者">
        <template #default="{ row }">
          {{ row.作者列表[0]?.name }}
        </template>
      </el-table-column>
      <el-table-column label="通讯作者">
        <template #default="{ row }">
          {{ getCorrespondingAuthor(row.作者列表) }}
        </template>
      </el-table-column>
      <el-table-column prop="院系" label="系"></el-table-column>
      <el-table-column prop="刊物/会议名称" label="刊物名称"></el-table-column>
      <el-table-column prop="期" label="期"></el-table-column>
      <el-table-column prop="卷" label="卷"></el-table-column>
      <el-table-column prop="页码" label="页码"></el-table-column>
      <el-table-column prop="论文发表范围" label="期刊"></el-table-column>
      <el-table-column prop="出版/发表时间" label="出版/发表时间"></el-table-column>
      <el-table-column prop="填写时间" label="填写时间"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { usePublicationStore } from '@/store/publication';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import type { Author } from '@/types/publication';

const publicationStore = usePublicationStore();
const { acceptedList, loading } = storeToRefs(publicationStore);

const getCorrespondingAuthor = (authors: Author[]) => {
  return authors.find(a => a.isCorresponding)?.name || '无';
};

onMounted(() => {
  // 如果 store 中还没有数据，可以触发一次获取
  if (publicationStore.publicationList.length === 0) {
    publicationStore.fetchPublications();
  }
});
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
