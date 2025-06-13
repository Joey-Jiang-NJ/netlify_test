<template>
  <div class="project-stats-container">
    <!-- 筛选器 -->
    <el-card shadow="never" class="filter-card">
      <el-form inline>
        <el-form-item label="统计年度">
          <el-select v-model="selectedYear" placeholder="选择年度" style="width: 120px;">
            <el-option v-for="year in yearOptions" :key="year" :label="year" :value="year" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <h2 class="stats-title">{{ selectedYear }}年 数据概览</h2>

    <!-- 数据概览 -->
    <el-row :gutter="20" class="summary-cards">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="card-content">
            <div class="card-label">年度立项总数</div>
            <div class="card-value">120</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="card-content">
            <div class="card-label">年度立项总金额 (万元)</div>
            <div class="card-value">1,500</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="card-content">
            <div class="card-label">年度到款总额 (万元)</div>
            <div class="card-value">800</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 图表和AI助手 -->
    <el-row :gutter="20">
      <el-col :span="18">
        <StatsDashboard />
      </el-col>
      <el-col :span="6">
        <el-card class="ai-assistant" shadow="never">
          <template #header>
            <div class="clearfix">
              <span>AI 助手</span>
            </div>
          </template>
          <div class="chat-window">
            <div ref="chatHistoryEl" class="chat-history">
              <div v-for="(message, index) in messages" :key="index" :class="['message-row', message.sender === 'ai' ? 'ai-message' : 'user-message']">
                <div class="message-bubble">
                  <span class="message-text">{{ message.text }}</span>
                </div>
              </div>
            </div>
            <div class="chat-input">
              <el-input 
                v-model="userInput" 
                placeholder="与AI对话分析数据..." 
                @keyup.enter="sendMessage"
                clearable
              >
                <template #append>
                  <el-button @click="sendMessage">发送</el-button>
                </template>
              </el-input>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import StatsDashboard from '../../components/project/StatsDashboard.vue';

const selectedYear = ref(new Date().getFullYear());

const yearOptions = computed(() => {
  const years = [];
  for (let year = 2025; year >= 2018; year--) {
    years.push(year);
  }
  return years;
});


// AI Assistant State
const messages = ref([
  { sender: 'ai', text: '您好，有什么可以帮您分析的吗？例如：今年哪个系的立项金额最高？' }
]);
const userInput = ref('');
const chatHistoryEl = ref<HTMLDivElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (chatHistoryEl.value) {
      chatHistoryEl.value.scrollTop = chatHistoryEl.value.scrollHeight;
    }
  });
};

const sendMessage = () => {
  if (!userInput.value.trim()) return;

  const userQuery = userInput.value;
  messages.value.push({ sender: 'user', text: userQuery });
  userInput.value = '';
  scrollToBottom();

  setTimeout(() => {
    let aiResponse = '';
    if (userQuery.includes('哪个系') && userQuery.includes('立项金额最高')) {
      aiResponse = '根据当前数据分析，金融系的立项总金额最高，达到了120万元。';
    } else if (userQuery.includes('横向') && userQuery.includes('纵向')) {
      aiResponse = '从项目数量上看，纵向项目有3个，多于横向项目的2个。';
    } else if (userQuery.includes('你好') || userQuery.toLowerCase().includes('hello')) {
      aiResponse = '您好！很高兴为您服务。';
    } else {
      aiResponse = '感谢您的提问，该问题我暂时无法回答。请注意，这是一个模拟回复。';
    }
    messages.value.push({ sender: 'ai', text: aiResponse });
    scrollToBottom();
  }, 1200);
};

</script>

<style scoped>
.project-stats-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}
.stats-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-top: 0;
}
.filter-card, .ai-assistant {
  border: none;
  background-color: #f9fafb;
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
.chat-window {
  height: 450px;
  display: flex;
  flex-direction: column;
}
.chat-history {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #fff;
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  margin-bottom: 10px;
}
.message-row {
  display: flex;
  margin-bottom: 12px;
}
.ai-message {
  justify-content: flex-start;
}
.user-message {
  justify-content: flex-end;
}
.message-bubble {
  padding: 8px 12px;
  border-radius: 10px;
  max-width: 80%;
  word-wrap: break-word;
}
.ai-message .message-bubble {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-text-color-primary);
}
.user-message .message-bubble {
  background-color: var(--el-color-primary);
  color: #fff;
}
</style>
