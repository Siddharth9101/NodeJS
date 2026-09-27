export type Task = {
  id: string;
  title: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type DbTaskRow = {
  id: string;
  title: string;
  status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};
