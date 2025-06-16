export interface Author {
  name: string;
  isCorresponding: boolean;
}

export interface UnifiedPublication {
  id: string;
  成果名称: string;
  成果类型: '论文' | '专著';
  论文状态?: '已发表' | '已接收' | null;
  作者列表: Author[];
  院系: string;
  '出版/发表时间': string;
  '刊物/会议名称'?: string;
  卷?: string;
  期?: string;
  页码?: string;
  出版单位?: string;
  书号?: string;
  isDeleted?: boolean;
} 