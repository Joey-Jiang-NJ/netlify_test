import { defineStore } from 'pinia';
import type { UnifiedPublication, Author } from '@/types/publication';

// 模拟的初始数据
const mockAuthors: Author[] = [
  { name: '张三', isCorresponding: true },
  { name: '李四', isCorresponding: false },
];

const mockPublications: UnifiedPublication[] = [
  {
    id: 'pub1',
    成果名称: 'Vue.js 深度探索',
    成果类型: '论文',
    论文状态: '已发表',
    作者列表: mockAuthors,
    院系: '计算机科学系',
    '出版/发表时间': '2023-10-01',
    '刊物/会议名称': '前端技术期刊',
    卷: '10',
    期: '4',
    页码: '120-135',
  },
  {
    id: 'pub2',
    成果名称: 'TypeScript 实战指南',
    成果类型: '专著',
    论文状态: null,
    作者列表: [{ name: '王五', isCorresponding: false }],
    院系: '软件工程系',
    '出版/发表时间': '2023-05-20',
    出版单位: '科技图书出版社',
    书号: '978-7-121-36558-0',
  },
  {
    id: 'pub3',
    成果名称: '关于人工智能的思考',
    成果类型: '论文',
    论文状态: '已接收',
    作者列表: [{ name: '赵六', isCorresponding: true }],
    院系: '人工智能系',
    '出版/发表时间': '2024-01-15',
    '刊物/会议名称': 'AI 进展会议',
  }
];

export const usePublicationStore = defineStore('publication', {
  state: () => ({
    publicationList: mockPublications as UnifiedPublication[],
    loading: false,
  }),
  getters: {
    getPublicationById: (state) => (id: string) => {
      return state.publicationList.find((p: UnifiedPublication) => p.id === id);
    },
    // 根据 SOP，AcceptedPapers 页面需要一个已接收论文的列表
    acceptedList: (state) => {
        return state.publicationList.filter((p: UnifiedPublication) => p.论文状态 === '已接收');
    }
  },
  actions: {
    async fetchPublications(filters?: any) {
      this.loading = true;
      console.log('Fetching with filters:', filters);
      // 在实际应用中，这里会调用 API
      // 这里我们仅模拟一个延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      // 实际开发中会根据 filters 筛选数据
      // this.publicationList = ...
      this.loading = false;
    },
    addPublication(publication: Omit<UnifiedPublication, 'id'>) {
      const newPublication: UnifiedPublication = {
        ...publication,
        id: `pub${Date.now()}`,
      };
      this.publicationList.push(newPublication);
    },
    updatePublication(updatedPublication: UnifiedPublication) {
      const index = this.publicationList.findIndex((p: UnifiedPublication) => p.id === updatedPublication.id);
      if (index !== -1) {
        this.publicationList[index] = updatedPublication;
      }
    },
    deletePublication(id: string) {
      // 软删除
      const publication = this.publicationList.find((p: UnifiedPublication) => p.id === id);
      if (publication) {
        publication.isDeleted = true;
      }
      // 或者直接从列表中移除
      // this.publicationList = this.publicationList.filter(p => p.id !== id);
    },
  },
});
