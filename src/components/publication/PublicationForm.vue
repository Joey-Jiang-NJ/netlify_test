<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    width="60%"
    @update:model-value="$emit('update:visible', $event)"
  >
    <el-form :model="formData" label-width="120px" ref="formRef">
      <el-form-item label="成果类型" prop="成果类型">
        <el-select v-model="formData.成果类型" placeholder="请选择成果类型">
          <el-option label="论文" value="论文"></el-option>
          <el-option label="专著" value="专著"></el-option>
          <!-- ... 其他成果类型 -->
        </el-select>
      </el-form-item>
      <el-form-item label="成果名称" prop="成果名称">
        <el-input v-model="formData.成果名称"></el-input>
      </el-form-item>

      <!-- 论文专有字段 -->
      <template v-if="formData.成果类型 === '论文'">
        <el-form-item label="刊物/会议名称" prop="刊物/会议名称">
          <el-input v-model="formData['刊物/会议名称']"></el-input>
        </el-form-item>
        <el-form-item label="卷" prop="卷">
          <el-input v-model="formData.卷"></el-input>
        </el-form-item>
        <el-form-item label="期" prop="期">
          <el-input v-model="formData.期"></el-input>
        </el-form-item>
        <el-form-item label="页码" prop="页码">
          <el-input v-model="formData.页码"></el-input>
        </el-form-item>
      </template>
      
      <!-- 专著专有字段 -->
       <template v-if="formData.成果类型 === '专著'">
        <el-form-item label="出版单位" prop="出版单位">
          <el-input v-model="formData.出版单位"></el-input>
        </el-form-item>
        <el-form-item label="书号" prop="书号">
          <el-input v-model="formData.书号"></el-input>
        </el-form-item>
      </template>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, toRefs, computed } from 'vue';
import type { PropType } from 'vue';
import type { UnifiedPublication } from '@/types/publication';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  initialData: {
    type: Object as PropType<UnifiedPublication | null>,
    default: null,
  }
});

const emit = defineEmits(['update:visible', 'submit']);

const formData = ref<Partial<UnifiedPublication>>({});
const formRef = ref(null);

watch(() => props.initialData, (newData) => {
  formData.value = newData ? { ...newData } : { 成果类型: '论文' };
}, { immediate: true });

const title = computed(() => props.initialData ? '编辑成果' : '新增成果');

const handleSubmit = () => {
  // 表单验证逻辑
  emit('submit', formData.value);
}

</script>
