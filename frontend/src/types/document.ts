export type ActionItem = {
  task: string;
  responsible_person: string | null;
  deadline: string | null;
};

export type DocumentAnalysis = {
  summary: string;
  key_points: string[];
  action_items: ActionItem[];
  decisions: string[];
};

export type DocumentResponse = {
  filename: string;
  text: string;
  pages: {
    page_number: number;
    text: string;
  }[];
  analysis: DocumentAnalysis;
};
