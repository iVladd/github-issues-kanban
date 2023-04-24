export interface Issue {
  id: number;
  assignee: {} | null;
  user: {
    id: number;
    login: string;
  } | null;
  created_at: string;
  comments: number;
  repository_url: string;
  state: string;
  title: string;
}
