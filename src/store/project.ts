import { defineStore } from 'pinia'
import type { Project, Funding } from '../types/project'

const initialFilters = {
  // Project Info Filters
  project: {
    year: null,
    dateRange: null,
    schoolId: '',
    name: '',
    leader: '',
    category: '', // 横纵向
    classification: '',
    fundType: '',
    department: '',
  },
  // Funding Info Filters
  funding: {
    year: null,
    dateRange: null,
    schoolId: '',
    name: '',
    leader: '',
    status: '',
    department: '',
  }
};

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [
      { display: '是', schoolId: 'XM2023001', name: '关于AI在科研管理中的应用研究', personnelId: 'T001', leader: '张三', department: '会计系', category: '横向', classification: '国际合作项目', fundType: '企业合作基金', sourceUnit: 'XX科技有限公司', startDate: '2023-01-15', endDate: '2024-12-31', approvedFund: 50, receivedFund: 20, approvalNumber: 'PZ2023001' },
      { display: '否', schoolId: 'XM2023002', name: '数字经济下的市场营销新模式探索', personnelId: 'T002', leader: '李四', department: '市场营销系', category: '纵向', classification: '国家社科基金', fundType: '面上项目', sourceUnit: '国家哲学社会科学工作办公室', startDate: '2023-03-01', endDate: '2025-02-28', approvedFund: 80, receivedFund: 40, approvalNumber: 'PZ2023002' },
      { display: '是', schoolId: 'XM2023003', name: '基于区块链的供应链金融风险研究', personnelId: 'T003', leader: '王五', department: '金融系', category: '纵向', classification: '国家自然科学基金', fundType: '青年基金A(杰青)', sourceUnit: '国家自然科学基金委员会', startDate: '2023-05-20', endDate: '2026-05-19', approvedFund: 120, receivedFund: 50, approvalNumber: 'PZ2023003' },
      { display: '是', schoolId: 'XM2024001', name: '企业组织行为与创新绩效的关联分析', personnelId: 'T004', leader: '赵六', department: '人力资源与组织行为系', category: '横向', classification: '校基金', fundType: '其他', sourceUnit: '校内科研基金管理办公室', startDate: '2024-02-10', endDate: '2025-02-09', approvedFund: 30, receivedFund: 30, approvalNumber: 'PZ2024001' },
      { display: '否', schoolId: 'XM2024002', name: '管理科学中的运筹优化算法应用', personnelId: 'T005', leader: '孙七', department: '管理科学与工程系', category: '纵向', classification: '教育部', fundType: '重点项目', sourceUnit: '中华人民共和国教育部', startDate: '2024-06-01', endDate: '2027-05-31', approvedFund: 200, receivedFund: 100, approvalNumber: 'PZ2024002' },
    ] as Project[],
    funding: [
      { projectId: 'XM2023001', projectName: '关于AI在科研管理中的应用研究', leader: '张三', amount: 20, date: '2023-09-01', status: '已核对', source: 'XX科技有限公司' },
      { projectId: 'XM2023002', projectName: '数字经济下的市场营销新模式探索', leader: '李四', amount: 40, date: '2023-04-20', status: '已核对', source: '国家哲学社会科学工作办公室' },
      { projectId: 'XM2023003', projectName: '基于区块链的供应链金融风险研究', leader: '王五', amount: 50, date: '2023-07-01', status: '未核对', source: '国家自然科学基金委员会' },
      { projectId: 'XM2024001', projectName: '企业组织行为与创新绩效的关联分析', leader: '赵六', amount: 30, date: '2024-03-01', status: '已核对', source: '校内科研基金管理办公室' },
      { projectId: 'XM2024002', projectName: '管理科学中的运筹优化算法应用', leader: '孙七', amount: 100, date: '2024-08-15', status: '未核对', source: '中华人民共和国教育部' },
    ] as Funding[],
    // Holds the live values from the filter input fields
    filterInputs: JSON.parse(JSON.stringify(initialFilters)),
    // Holds the filters that are actually applied to the tables
    activeFilters: JSON.parse(JSON.stringify(initialFilters)),
  }),
  actions: {
    addProject(project: Project) {
      this.projects.push(project)
    },
    updateProject(project: Project) {
      const index = this.projects.findIndex(p => p.schoolId === project.schoolId)
      if (index !== -1) {
        this.projects[index] = project
      }
    },
    // Copies the current input values to the active filters
    applyFilters(filterType: 'project' | 'funding') {
      this.activeFilters[filterType] = JSON.parse(JSON.stringify(this.filterInputs[filterType]));
    },
    // Resets both the input fields and the active filters
    resetFilters(filterType: 'project' | 'funding') {
      this.filterInputs[filterType] = JSON.parse(JSON.stringify(initialFilters[filterType]));
      this.activeFilters[filterType] = JSON.parse(JSON.stringify(initialFilters[filterType]));
    }
  }
})
