export interface Project {
  display: '是' | '否';
  schoolId: string;
  name: string;
  personnelId: string; // 人员ID
  leader: string;
  department: string;
  category: '横向' | '纵向';
  classification: string;
  fundType: string;
  sourceUnit: string; // 下达单位
  startDate: string;
  endDate: string;
  approvedFund: number;
  receivedFund: number;
  approvalNumber: string;
}

export interface Funding {
  projectId: string;
  projectName: string;
  leader: string;
  amount: number;
  date: string;
  status: '已核对' | '未核对';
  source: string; // 到款来源
}
